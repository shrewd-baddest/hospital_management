import pool from '../Servers/database.js'

export const getProfile=async (req,res) => {
    try {
const sql1=`SELECT d.name,u.full_name,u.email,u.role,u.phone,TO_CHAR(DATE_TRUNC('day',schedule_date
))`

        
    } catch (error) {
res.status(500).json({message:error.message})
        
    }
}