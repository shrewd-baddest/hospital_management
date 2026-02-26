import pool from "../../Servers/database.js";

export const getPatients = async (req, res) => {
  const { id } = req.user;
  try {
    const sql = `SELECT p.id, u.first_name AS patient_name, w.ward_name, a.start_time
FROM patient p
JOIN users u ON p.user_id = u.id    
JOIN appointments a ON p.id = a.patient_id
JOIN ward w ON p.ward_id = w.id
WHERE a.doctor_id = $1;`;
    const result = await pool.query(sql, [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchPatients = async (req, res) => {
  const { id } = req.user;
  const { name, status } = req.query;
  try {
    let sql = `SELECT p.id, u.first_name AS patient_name, w.ward_name, a.start_time
FROM patient p
JOIN users u ON p.user_id = u.id
JOIN appointments a ON p.id = a.patient_id
JOIN ward w ON p.ward_id = w.id
WHERE a.doctor_id = $1`;
    const params = [id];
    if (name) {
      sql += ` AND u.first_name ILIKE $${params.length + 1}`;
      params.push(`%${name}%`);
    }
    if (status) {
      sql += ` AND a.status = $${params.length + 1}`;
      params.push(status);
    }
    const result = await pool.query(sql, params);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMedicalRecords = async (req, res) => {
  const { patientId } = req.params;
  try {
    const sql = `SELECT * FROM medical_records WHERE patient_id = $1`;
    const result = await pool.query(sql, [patientId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
