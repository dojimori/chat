
import express from "express"
import path from "path"



/* middlewares */
import session from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from "cookie-parser"
/* end middlewares */


export const app = express();

app.use(morgan('dev'))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: "secrethehehe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,          // if frontend is https
  }
}))
app.use(cookieParser())
const root = process.cwd();
app.use('/uploads', express.static(path.join(root, 'uploads')))