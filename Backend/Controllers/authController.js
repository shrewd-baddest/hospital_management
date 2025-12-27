import dotenv from 'dotenv';
dotenv.config();
import pool from "../Servers/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
  
 const Login = async (req,res) => {
  const { passWord,Email ,googleEmail} = req.body;
   try {
    // Check if user exists
    let user;
    if(Email){
    const [rows] = await pool.query('SELECT * FROM users  WHERE email = $1', [Email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

  user = rows[0];
     // Compare password
    const isMatch = await bcrypt.compare(passWord, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid  password' });
    }}
    else if(googleEmail){
 const [rows] = await pool.query('SELECT * FROM users  WHERE email = $1', [googleEmail]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

  user = rows[0];

    }
  
   

    // Generate JWT token
    const token = jwt.sign({ id: user.id ,role:user.role}, process.env.SECRET_KEY, { expiresIn: '1h' });
    const role=user.role;
    res.json({ token,status:"success", role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export default Login;