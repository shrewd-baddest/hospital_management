import pool from "../Servers/database.js";

export const getPermissions=async (req,res) => {
    
    try {
        const sql1=`SELECT * FROM roles`
        const sql2=`SELECT role, COUNT(*) AS total_users
FROM users
GROUP BY role;`

        const roles= await pool.query(sql1);
        const users = await pool.query(sql2);

 
        res.json({ roles:roles.rows, users:users.rows });

    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}