import pool from '../Servers/database.js';

export const systemOverview = async (req, res) => {
  try {
    const sql1 = `SELECT COUNT(*) AS total_patients FROM patients`;
    const sql2 = `SELECT COUNT(*) AS total_doctors FROM doctors`;
    const sql3 = `SELECT COUNT(*) AS empty_beds FROM wards WHERE status = $1`;
    const sql4 = `SELECT COUNT(*) AS occupied_beds FROM wards WHERE status = $1`;
    const sql5 = `
      SELECT *
      FROM activity
      ORDER BY created_at DESC
      LIMIT 7
    `;

    const [
      totalPatients,
      totalDoctors,
      totalEmptyBeds,
      totalOccupiedBeds,
      activities
    ] = await Promise.all([
      pool.query(sql1),
      pool.query(sql2),
      pool.query(sql3, ["empty"]),
      pool.query(sql4, ["occupied"]),
      pool.query(sql5)
    ]);

    const overview = {
      totalPatients: totalPatients.rows[0].total_patients,
      totalDoctors: totalDoctors.rows[0].total_doctors,
      totalEmptyBeds: totalEmptyBeds.rows[0].empty_beds,
      totalOccupiedBeds: totalOccupiedBeds.rows[0].occupied_beds,
      recentActivities: activities.rows
    };

    res.status(200).json({ overview });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const admissionsOverTime = async (req, res) => {
  try {
  const sql=`SELECT
    CHAR(admission_date,'mon) AS month,
    COUNT(*) AS total_admissions
FROM
    admissions
GROUP BY
    DATE_TRUNC('month', admission_date)
ORDER BY
    month`;
    const result = await pool.query(sql);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};