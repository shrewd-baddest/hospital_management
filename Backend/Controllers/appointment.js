import pool from "../Servers/database";
export const getAppointmentsEvents=async(req,res)=>{
    try {
 const sql=`SELECT 
    a.appointment_date AS start_time,
    a.appointment_date + INTERVAL '1 hour' AS end_time,
    COALESCE(
    CONCAT('Patient: ', u1.full_name),    ← Returns here if patient exists
    CONCAT('Dr. ', u2.full_name),         ← Never reached
    CONCAT('Nurse - ', u3.full_name)      ← Never reached
  ) AS title
  FROM appointments AS a
  LEFT JOIN users AS u1 ON a.patient_id = u1.id
  LEFT JOIN doctors AS d ON a.doctor_id = d.id AND a.doctor_id IS NOT NULL
  LEFT JOIN users AS u2 ON d.user_id = u2.id AND d.id IS NOT NULL
  LEFT JOIN nurses AS n ON a.nurse_id = n.id AND a.nurse_id IS NOT NULL
  LEFT JOIN users AS u3 ON n.user_id = u3.id AND n.id IS NOT NULL`;

    const result = await pool.query(sql);

    const events = result.rows.map(row => ({
        title: row.title,
        start: row.start_time.toISOString(),
        end: row.end_time.toISOString()
      }));

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}