import express from "express";
import { upload } from "../Middleware/multer.config.js";  
import { infoValidation } from "../Middleware/pdf.validation.js";
import { fileUpload } from "../Controller/pdf.controller.js";  

const router = express.Router();

router.post("/pdfloader", upload.single("file"), infoValidation, fileUpload);

export default router;