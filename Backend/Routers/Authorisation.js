import { Router } from "express";
import Login  from "../Controllers/authController.js";
const authRoutes=Router();
authRoutes.post('/login',Login);



export default authRoutes