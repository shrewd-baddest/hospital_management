import pool from "../../Servers/database.js";

export const getdashboardDetails = async (req, res) => {
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
    const sql3 = `SELECT u.first_name AS patient_name, a.start_time,a.reason,a.status 
     FROM appointments a JOIN users u ON a.patient_id=u.id  
      WHERE a.doctor_id=$1 AND a.appointment_date::date = CURRENT_DATE`;

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
