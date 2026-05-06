import pool from "../../Servers/database.js";

export const getPermissions = async (req, res) => {
  const { limit, cursor } = req.query;
  try {
    const sql1 = `SELECT * FROM roles`;
    const sql2 = `SELECT role, COUNT(*) AS total_users
FROM users
GROUP BY role;`;
    let query;
    let values;

    if (cursor) {
      query =
        "SELECT * FROM products WHERE $1 > created_at ORDER BY created_at ASC LIMIT $2";
      values = [cursor, limit];
    } else {
      query = "SELECT * FROM products ORDER BY id ASC LIMIT $1";
      values = [limit];
    }
    const [roles, users, activity] = await Promise.all([
      pool.query(sql1),
      pool.query(sql2),
      pool.query(query, values),
    ]);
    const data = activity.rows;
    const nextCursor = data.length ? data[data.length - 1].id : null;

    res.json({
      roles: roles.rows,
      users: users.rows,
      activity: data,
      nextCursor: nextCursor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
