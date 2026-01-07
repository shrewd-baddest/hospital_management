import pool from '../Servers/database.js';
export const getDepartments=async(req,res)=>{
  try {
    const sql = 'SELECT * FROM departments';
    const result = await pool.query(sql);
    res.status(200).json({ departments: result.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

export const searchDepartments=async(req,res)=>{
    try {
        const {search}=req.body;
        const sql=`SELECT * FROM departments WHERE name ILIKE $1`;
        const values=[`%${search}%`];
        const result=await pool.query(sql,values);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const addDepartment=async(req,res)=>{
    try {
        const {name,head,staff,Bed}=req.body;
        const sql=`INSERT INTO departments (name,head,staff,Bed) VALUES ($1,$2,$3,$4) RETURNING *`;
        const values=[name,head,staff,Bed];
        const result=await pool.query(sql,values);
        res.status(201).json({message:"Department added successfully",department:result.rows[0]});
    } catch (error) {
        res.status(500).json({message:error.message});
    }   
}

export const updateDepartment=async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,head,staff,Bed}=req.body;
        const sql=`UPDATE departments SET name=$1,head=$2,staff=$3,Bed=$4 WHERE id=$5 RETURNING *`;
        const values=[name,head,staff,Bed,id];
        const result=await pool.query(sql,values);
        res.status(200).json({message:"Department updated successfully",department:result.rows[0]});
    } catch (error) {
        res.status(500).json({message:error.message});
    }   
}
export const getDepartmentById=async(req,res)=>{
    try {
        const {id}=req.params;
        const sql=`SELECT * FROM departments WHERE id=$1`;
        const values=[id];
        const result=await pool.query(sql,values);
        if(result.rows.length===0){
            return res.status(404).json({message:"Department not found"});
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({message:error.message});
    }           
}