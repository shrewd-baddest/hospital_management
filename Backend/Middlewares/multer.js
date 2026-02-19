import { storage } from "../Controllers/admin/cloudinary.js";
import multer from "multer";

const upload = multer({ storage: storage });

export default upload;
