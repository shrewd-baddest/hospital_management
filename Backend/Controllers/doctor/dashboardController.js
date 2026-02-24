import pool from "../../Servers/database.js";

export const getdashboardDetails = async (req, res) => {
  const { id } = req.user;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const sql1 = `
      SELECT COUNT(*) AS appointment 
      FROM appointments 
      WHERE doctor_id=$1 
      AND appointment_date::date = CURRENT_DATE
    `;

    const sql2 = `
      SELECT COUNT(*) AS lab_results 
      FROM lab_results 
      WHERE status=$1 AND doctor_id=$2
    `;
    const sql3 = `SELECT 
    pu.first_name AS patient_name,
    du.first_name AS doctor_name,
    a.start_time,
    a.reason,
    a.status
FROM appointments a
-- Join to get patient info
JOIN patient p ON a.patient_id = p.id
JOIN users pu ON p.user_id = pu.id
-- Join to get doctor info
JOIN doctor d ON a.doctor_id = d.id
JOIN users du ON d.user_id = du.id
WHERE a.appointment_date::date = CURRENT_DATE
AND a.doctor_id = $1;`;

    const sql4 = `SELECT n.message,n.is_read,n.created_at,n.status FROM notifications n
    JOIN user_notifications un ON n.id=un.notification_id
    WHERE un.user_id=$1 ORDER BY created_at DESC LIMIT 5`;

    const [appointments, lab, details, notifications] = await Promise.all([
      client.query(sql1, [id]),
      client.query(sql2, ["complete", id]),
      client.query(sql3, [id]),
      client.query(sql4, [id]),
    ]);
    await client.query("COMMIT");
    res.status(200).json({
      appointments: appointments.rows[0],
      lab: lab.rows[0],
      appointments: details.rows,
      notifications: notifications.rows,
      fullName:
        details.rows.length > 0 ? details.rows[0].doctor_name : "Doctor",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).json({ message: error.message });
  } finally {
    client.release();
  }
};
