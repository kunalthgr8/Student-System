import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://credit-sea-assignment.vercel.app'],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
app.use(cookieParser())


const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files from 'uploads' folder
app.use("/uploads", express.static(uploadsDir));


//routes import
import userRouter from './src/routes/user.route.js';
import fileUploadRouter from './src/routes/fileUpload.route.js';
import fetchDetails from "./src/routes/fetchDetails.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/upload", fileUploadRouter);
app.use("/api/data", fetchDetails);


export { app };