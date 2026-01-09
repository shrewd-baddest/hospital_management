import pool from '../Servers/database.js';

export const getAllDoctors=async(req,res)=>{
    try {
        const doctors=await pool.query(
            `SELECT users.id, users.name, users.image, departments.department_name
            FROM users
            JOIN departments ON users.department_id = departments.id
            WHERE users.role = 'doctor' AND users.is_active = TRUE`
        );
const doctorsData=doctors.rows;
        res.status(200).json(doctorsData);
    } catch (error) {
        res.status(500).json({message:'Server Error', error:error.message});
    }
};
export const getDoctorSchedule=async(req,res)=>{
    const {doctorId}=req.params;
    try {
        const schedules=await pool.query(
            `SELECT schedule_date, start_time, end_time
            FROM doctor_schedules
            WHERE doctor_id = $1`,
            [doctorId]
        );
        const schedulesData=schedules.rows;
        res.status(200).json(schedulesData);
    } catch (error) {
        res.status(500).json({message:'Server Error', error:error.message});
    }   
};