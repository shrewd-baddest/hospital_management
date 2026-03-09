import pool from "../../Servers/database.js";

export const getDocProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const sql = `SELECT role FROM users WHERE id=$1`;
    const { rows } = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const role = rows[0].role;
    res.status(200).json({ data: { id, role } });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};
