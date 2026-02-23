import pool from "../../Servers/database.js";

export const getAppointment = async (req, res) => {
  const { id } = req.user;

  try {
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

    const sql3 = `
      SELECT u.first_name, A.start_time, A.end_time, d.name 
      FROM appointments A
      INNER JOIN users u ON u.id=A.patient_id
      INNER JOIN departments d ON d.id=A.department_id 
      WHERE A.doctor_id=$1
    `;

    const sql4 = `SELECT message,is_read,created_at,status FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 5`;
    const [appointments, lab, details] = await Promise.all([
      pool.query(sql1, [id]),
      pool.query(sql2, ["complete", id]),
      pool.query(sql3, [id]),
    ]);

    res.status(200).json({
      appointments: appointments.rows[0],
      lab: lab.rows[0],
      details: details.rows,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
