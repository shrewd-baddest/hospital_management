import { Router } from "express";
import Login from "../Controllers/admin/authController.js";
import { registerUser } from "../Controllers/admin/registerController.js";
const authRoutes = Router();
authRoutes.post("/login", Login);
authRoutes.post("/register", registerUser);

export default authRoutes;
