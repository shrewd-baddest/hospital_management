import pool from '../Servers/database.js'

export const getProfile=async (req,res) => {
    const {doctorId}=req.params;
    try {
const sql1=`SELECT d.name,u.full_name,u.email,u.role,u.phone,TO_CHAR(DATE_TRUNC('day',sc.schedule_date), 'YYYY-MM-DD') AS schedule_date, sc.start_time, sc.end_time,u.image
FROM doctors AS do
JOIN users AS u ON do.user_id=u.id
JOIN departments AS d ON do.department_id=d.id
LEFT JOIN doctor_schedules AS sc ON do.id=sc.doctor_id
WHERE u.id=$1`;
const values1=[doctorId];
const result=await pool.query(sql1,values1);
const profileData=result.rows[0];
const schedule=result.rows.map(row=>({
    schedule_date:row.schedule_date,
    start_time:row.start_time,
    end_time:row.end_time
})).filter(sch=>sch.schedule_date!==null);
res.status(200).json({profileData,schedule});
    }

        
     catch (error) {
res.status(500).json({message:error.message})
        
    }
}

export const getShifts=async(req,res)=>{
    const {doctorId}=req.params;