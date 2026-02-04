import pool from "../Servers/database.js";

const getPreference=async(req,res)=>{

try {
    const sql=`SELECT * FROM getPreference`;
    const results=pool.query(sql);
    res.status(200).json(results.rows[0]);

} catch (error) {
    console.error('Error fetching system settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


const updatePreference=async (req,res) => {
const {volume,isAutoUpdateOn,isSoundOn,fontSize,isSwitchOn,theme}=req.body
const user_id=req.user;
    try {
        const checkUser=await pool.query(`SELECT user_id FROM preference`);
    var result;
        if(checkUser.rows.includes(user_id)){

       result=await pool.query(`UPDATE preference SET user_id=$1,volume=$2,isSoundOn=$3,fontSize=$4,isSwitchOn=$5,theme=$6 RETURNING *`,
            [user_id,volume,isSoundOn,fontSize,isSwitchOn,theme]
        )
    }
    else{
        const sql=`INSERT INTO preference (user_id,volume,isSoundOn,fontSize,isSwitchOn,theme)
        values($1,$2,$3,$4,$5,$6) RETURNING *`
        result=await pool.query(sql,[user_id,volume,isSoundOn,fontSize,isSwitchOn,theme]);
    }
       res.status(200).json(result.rows[0]);
        
    } catch (error) {
   console.error('Error fetching system settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

    
}
