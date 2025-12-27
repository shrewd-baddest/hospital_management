import psql from 'pg'
const {Pool}=psql;
import dotenv from 'dotenv';
dotenv.config();
 
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT|| 3306, 
   waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

 
};

 const pool=new Pool(dbConfig);
 pool.on('connect',()=>{
  console.log('postgre connected successful');
 })

   


  

export default pool;