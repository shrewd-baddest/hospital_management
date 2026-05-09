import pool from "../../Servers/database.js";

export const getPermissions = async (req, res) => {
  const { limit, cursor } = req.query;
  let range = parseInt(limit) + 1;
  // console.log(limit, cursor);
  try {
    const sql1 = `SELECT * FROM roles`;
    const sql2 = `SELECT role, COUNT(*) AS total_users
FROM users
GROUP BY role;`;
    let query;
    let values;

    if (cursor) {
      query =
        "SELECT * FROM activity WHERE $1 >= created_at ORDER BY created_at ASC LIMIT $2";
      values = [cursor, range];
    } else {
      query = "SELECT * FROM activity ORDER BY id ASC LIMIT $1";
      values = [limit];
    }
    const [roles, users, activity] = await Promise.all([
      pool.query(sql1),
      pool.query(sql2),
      pool.query(query, values),
    ]);
    const data = activity.rows;
    const nextCursor = data[data.length - 1].created_at || null;

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
