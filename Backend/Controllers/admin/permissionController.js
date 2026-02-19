import pool from "../../Servers/database.js";

export const getPermissions = async (req, res) => {
  try {
    const sql1 = `SELECT * FROM roles`;
    const sql2 = `SELECT role, COUNT(*) AS total_users
FROM users
GROUP BY role;`;
    const sql3 = `SELECT * FROM activity`;

    const [roles, users, activity] = await Promise.all([
      pool.query(sql1),
      pool.query(sql2),
      pool.query(sql3),
    ]);

    res.json({ roles: roles.rows, users: users.rows, activity: activity.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
