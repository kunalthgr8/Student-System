import multer from "multer";
import { Router } from "express";
import { uploadFile } from "../controllers/fileUpload.controller.js";

const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads");
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        },
    }),
});

router.route("/").post(upload.single("file"), uploadFile);

export default router;
