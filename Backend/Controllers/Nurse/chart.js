import pool from "../../Servers/database.js";

export const getReportData = async (req, res) => {
  try {
    let query = `SELECT status, COUNT(*) AS total_patients
FROM patients
GROUP BY status;`;
    const result = await pool.query(query);
    const data = result.rows.map((row) => ({
      label: row.status,
      value: row.total_patients,
    }));
    res.json(data);
  } catch (error) {
    console.error("Error fetching report data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
