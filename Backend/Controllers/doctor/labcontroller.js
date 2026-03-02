import pool from "../../Servers/database";

const getLabResults = async (req, res) => {
  const { id } = req.user;
  const { status, name } = req.query;
  try {
    const sql = `SELECT status, COUNT(*) AS results
FROM lab_results
WHERE status IN ('critical', 'pending', 'reviewed')
GROUP BY status;`;
    let sql2 = `SELECT u.full_name,l.test_name,l.results,l.status,l.created_at lab_results l 
    INNER JOIN  patients p ON l.patient_id=p.id
    INNER JOIN USERS u ON u.id=p.user_id WHERE l.doctor_id=$1 `;

    let params = [id];
    if (name && status !== "all") {
      sql += `AND test_name=$2 AND status=$3`;
      params.push(name, status);
    } else if (name && status == "all") {
      sql += `AND test_name=$2`;
      params.push(name);
    } else if (status && status !== "all") {
      sql += `AND status=$2`;
      params.push(status);
    }

    const [counts, results] = await Promise.all(
      pool.query(sql, [id]),
      pool.query(sql2, params),
    );
    res.status(200).json({ counts: counts.rows[0], results: results.rows });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};
