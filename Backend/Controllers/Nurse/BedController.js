import pool from "../../Servers/database.js";

export const wardBeds = async (req, res) => {
  try {
    const sql = `SELECT COUNT(*) AS "totalBeds",
        COUNT(*) FILTER (WHERE status = 'occupied') AS "occupiedBeds",
        COUNT(*) FILTER (WHERE status = 'available') AS "availableBeds";`;
    const { rows } = await pool.query(sql);
    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const wardBedDescription = async (req, res) => {
  try {
    const { ward } = req.query;
    const sql = ` SELECT b.bed_no, b.status, U.full_name AS patient_name
FROM beds b
LEFT JOIN patients p ON p.id = b.patient_id
LEFT JOIN users U ON U.id = p.user_id
WHERE b.ward_id = (SELECT id FROM wards WHERE ward_name = $1);`;
    const { rows } = await pool.query(sql, [ward]);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
