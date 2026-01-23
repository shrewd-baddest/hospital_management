import pool from "../Servers/database.js";

export const getgraphdata = async (req, res) => {
  const { reportType, dateRange = {}, days = 7 } = req.body;

  try {
    let sql;
    let params = [];
    const groupFormat = days > 31 ? "Mon" : "DD";

    const hasRange = Object.keys(dateRange).length > 0;

    const dateCondition = hasRange
      ? `BETWEEN $1 AND $2`
      : `>= NOW() - INTERVAL '${days} days'`;

    if (hasRange) {
      params = [dateRange.startDate, dateRange.endDate];
    }

    switch (reportType) {
      case "admissions":
        sql = `
          SELECT 
            COUNT(*) AS value,
            TO_CHAR(admission_date, '${groupFormat}') AS label
          FROM admissions
          WHERE admission_date ${dateCondition}
          GROUP BY label
          ORDER BY label
        `;
        break;

      case "billing":
        sql = `
          SELECT 
            SUM(amount) AS value,
            TO_CHAR(created_at, '${groupFormat}') AS label
          FROM billings
          WHERE created_at ${dateCondition}
          GROUP BY label
          ORDER BY label
        `;
        break;

      case "occupancy":
        sql = `
          SELECT 
            COUNT(*) AS value,
            TO_CHAR(created_at, '${groupFormat}') AS label
          FROM wards
          WHERE status = 'occupied'
            AND created_at ${dateCondition}
          GROUP BY label
          ORDER BY label
        `;
        break;

      case "staff":
        sql = `
          SELECT 
            COUNT(*) AS value,
            TO_CHAR(created_at, '${groupFormat}') AS label
          FROM users
          WHERE role <> 'patient'
            AND created_at ${dateCondition}
          GROUP BY label
          ORDER BY label
        `;
        break;

      default:
        return res.status(400).json({ message: "Invalid report type" });
    }

    const { rows } = await pool.query(sql, params);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
