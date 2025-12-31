import { storage } from "../Controllers/cloudinary.js";  
import multer  from "multer";  

const upload = multer({ storage: storage });

export default upload;