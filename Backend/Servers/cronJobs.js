import cron from "node-cron";
import pool from "./database.js";

export const startCron = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking upcoming appointments...");

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // 1️⃣ Get appointments needing reminder
      const { rows: appointments } = await client.query(`
        SELECT id, doctor_id, start_time
        FROM appointments
        WHERE status = 'scheduled'
        AND reminder_sent = FALSE
        AND appointment_date = CURRENT_DATE
        AND start_time BETWEEN 
            CURRENT_TIME + INTERVAL '59 minutes'
        AND CURRENT_TIME + INTERVAL '60 minutes'
        FOR UPDATE
      `);

      for (const appointment of appointments) {
        // 2️⃣ Insert notification event
        const { rows } = await client.query(
          `
          INSERT INTO notifications (type, message, reference_id)
          VALUES ($1, $2, $3)
          RETURNING id
        `,
          [
            "appointment_reminder",
            `You have an upcoming appointment at ${appointment.start_time}`,
            appointment.id,
          ],
        );

        const notificationId = rows[0].id;

        // 3️⃣ Insert into user_notifications
        await client.query(
          `
          INSERT INTO user_notifications (user_id, notification_id, is_read)
          VALUES ($1, $2, FALSE)
        `,
          [appointment.doctor_id, notificationId],
        );

        // 4️⃣ Mark reminder as sent
        await client.query(
          `
          UPDATE appointments
          SET reminder_sent = TRUE
          WHERE id = $1
        `,
          [appointment.id],
        );
      }

      await client.query("COMMIT");

      console.log("Reminder notifications committed successfully.");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Transaction rolled back:", error.message);
    } finally {
      client.release();
    }
  });
};
