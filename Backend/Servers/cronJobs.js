import cron from "node-cron";
import pool from "./database.js";

export const startCron = () => {
  // Every minute
  cron.schedule("* * * * *", async () => {
    console.log("Checking upcoming appointments...");

    try {
      // 1️⃣ Find appointments happening in 1 hour
      const upcomingAppointments = await pool.query(`
        SELECT id, doctor_id, start_time
        FROM appointments
        WHERE status = 'scheduled'
        AND appointment_date = CURRENT_DATE
        AND start_time BETWEEN 
            CURRENT_TIME + INTERVAL '59 minutes'
        AND CURRENT_TIME + INTERVAL '60 minutes'
      `);

      for (const appointment of upcomingAppointments.rows) {
        // 2️⃣ Insert notification event
        const notificationResult = await pool.query(
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

        const notificationId = notificationResult.rows[0].id;

        // 3️⃣ Assign to doctor (receiver)
        await pool.query(
          `
          INSERT INTO user_notifications (user_id, notification_id, is_read)
          VALUES ($1, $2, FALSE)
        `,
          [appointment.doctor_id, notificationId],
        );
      }

      console.log("Reminder notifications created.");
    } catch (error) {
      console.error("Cron error:", error.message);
    }
  });
};
