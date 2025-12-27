import pool from "../Servers/database.js";

export const getAllUsers = async (req, res) => {
  const sql = `SELECT first_name, email, role, is_active FROM users`;

  try {
    const users = await pool.query(sql);

    res.status(200).json({
      users: users.rows   // return all users, not just the first one
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserSearch = async (req, res) => {
  const { search } = req.body;

  try {
    const sql = `SELECT first_name, email, role, is_active FROM users WHERE first_name ILIKE $1 OR email ILIKE $1`;
    const users = await pool.query(sql, [`%${search}%`]);

    res.status(200).json({
      users: users.rows
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};