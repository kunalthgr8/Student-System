import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://credit-sea-assignment.vercel.app'],
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './src/routes/user.route.js'

//routes declaration
app.use("/api/v1/users", userRouter)


export { app }