import { Router } from "express";
import Login  from "../Controllers/authController.js";
import { registerUser } from "../Controllers/registerController.js";
const authRoutes=Router();
authRoutes.post('/login',Login);
authRoutes.post('/register',registerUser);




export default authRoutes