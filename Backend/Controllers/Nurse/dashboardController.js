import pool from "../../Servers/database.js";

export const nurseDash = async (req, res) => {
//   const nurse_id = req.user;

  try {
    const sql = `SELECT
    u.full_name AS "fullName",

    COUNT(p.id) AS "totalPatients",

    COUNT(p.id) FILTER (
        WHERE DATE(p.created_at) = CURRENT_DATE
    ) AS "todayPatients",

    COUNT(a.id) FILTER (
        WHERE a.status = 'discharged'
        AND DATE(a.discharge_date) = CURRENT_DATE
    ) AS "dischargedToday",

    COUNT(p.id) FILTER (
        WHERE p.status = 'critical'
    ) AS "criticalPatients",

    -- Appointments
    (
        SELECT COUNT(*)
        FROM appointments ap
        WHERE ap.nurse_id = n.id
        AND DATE(ap.appointment_date) = CURRENT_DATE
    ) AS "appointments",

    -- Alerts (user-specific)
    (
        SELECT COUNT(*)
        FROM user_notifications un
        JOIN notifications nt ON nt.id = un.notification_id
        WHERE un.user_id = u.id
        AND un.is_read = FALSE
        AND nt.status = 'critical'
    ) AS "alerts"

FROM nurses n
JOIN users u ON u.id = n.user_id

-- Nurse department
JOIN departments d ON d.id = n.department_id

-- Wards in that department
LEFT JOIN wards w ON w.department_id = d.id

-- Patients in those wards
LEFT JOIN patients p ON p.ward_id = w.id

-- Admissions
LEFT JOIN admissions a ON a.patient_id = p.id

WHERE n.id ='cb4d4bc3-a940-479b-9127-1be8250a4bb7'

GROUP BY u.full_name, n.id, u.id; `;

  const { rows } = await pool.query(sql);
res.json(rows[0] || {
  fullName: "nurse",
  totalPatients: 0,
  todayPatients: 0,
  dischargedToday: 0,
  criticalPatients: 0,
  appointments: 0,
  alerts: 0
});  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
