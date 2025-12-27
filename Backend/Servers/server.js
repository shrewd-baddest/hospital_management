import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
 import authRoutes from '../Routers/Authorisation.js';
import webpages from '../Routers/Webpages.js';
dotenv.config()
const app=express();
const port=process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/authorisation',authRoutes);
app.use('/webpages',webpages)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});