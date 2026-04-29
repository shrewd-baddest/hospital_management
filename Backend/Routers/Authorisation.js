import { Router } from "express";
import Login from "../Controllers/admin/authController.js";
import { registerUser } from "../Controllers/admin/registerController.js";
import upload from "../Middlewares/multer.js";
const authRoutes = Router();
authRoutes.post("/login", Login);
authRoutes.post(
  "/register",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "credentials", maxCount: 1 },
  ]),
  registerUser,
);

export default authRoutes;
