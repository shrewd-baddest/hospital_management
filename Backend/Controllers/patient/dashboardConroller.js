import pool from "../../Servers/database.js";

export const patientDash = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(req.user.id);
    const query = `SELECT 
    u.full_name AS "fullName",

    du.full_name AS doctor_name,
    a.appointment_date,
    a.start_time,

    lr.test_name,
    lr.status AS lab_status,

    b.amount,
    b.payment_date,

    n.message AS reminder

FROM users u

LEFT JOIN patients p 
    ON p.user_id = u.id

LEFT JOIN appointments a 
    ON a.patient_id = p.id

LEFT JOIN doctors d 
    ON d.id = a.doctor_id

LEFT JOIN users du 
    ON du.id = d.user_id

LEFT JOIN lab_results lr 
    ON lr.patient_id = p.id

LEFT JOIN billing b 
    ON b.patient_id = p.id

LEFT JOIN user_notifications un 
    ON un.user_id = u.id

LEFT JOIN notifications n 
    ON n.id = un.notification_id

WHERE u.id = $1`;

    const { rows } = await pool.query(query, [id]);
    console.log(rows);
    res.status(200).json(
      rows[0] || {
        fullName: "patient",
        doctor_name: "doctor",
        appointment_date: "00:00:00",
        start_time: "00:00",
        test_name: "",
        lab_status: "",
        amount: 0,
        payment_date: "00:00:00",
        reminder: "",
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
