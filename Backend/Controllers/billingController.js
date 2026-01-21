import pool from "../Servers/database.js";

export const getBillingOverview = async (req, res) => {
  try {

    const sql1 = `
      SELECT 
        COUNT(*) AS patients_billed,
        COALESCE(SUM(amount), 0) AS total_amount
      FROM billing
      WHERE status = 'pending'
      AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)
    `;

    const sql2 = `
      SELECT 
        COALESCE(SUM(amount), 0) AS overdue,
          COUNT(*) AS total_overdue_invoices
      FROM billing
      WHERE payment_date < CURRENT_DATE
      AND status = 'pending'
    `;

    const sql3 = `
      SELECT *
      FROM billing
      WHERE payment_date < CURRENT_DATE
      AND status = 'pending'
    `;

    const [billingStats, overdueStats, overdueInvoices] =
      await Promise.all([
        pool.query(sql1),
        pool.query(sql2),
        pool.query(sql3)
      ]);
const billingOverview={
  totalPatientsBilled: billingStats.rows[0].patients_billed,
  totalOutstanding: billingStats.rows[0].total_amount,
    overdue_amount: overdueStats.rows[0].overdue,
    overdueInvoices: overdueStats.rows[0].total_overdue_invoices
   };
  var outstandingInvoices = [];
  outstandingInvoices.push(...overdueInvoices.rows);

    res.status(200).json({ billingOverview ,outstandingInvoices});

  } catch (error) {
    console.error("Error fetching billing overview:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { patientName,issueDate,dueDate,services,amount } = req.body;
    var patient_id=await pool.query('SELECT id FROM patients WHERE full_name=$1',[patientName]);
    patient_id=patient_id.rows[0].id;
    const sql = `
      INSERT INTO billing (patient_id, services, amount, payment_date, status, created_at)
      VALUES ($1, $2, $3, $4, 'pending', NOW())
        RETURNING *;
    `;

    const result = await pool.query(sql, [
        patient_id,
        services,
        amount,
        dueDate,
        issueDate
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating invoice:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
