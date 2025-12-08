import express, { Request, Response } from "express"
import http from 'http'
import { Server } from 'socket.io'
import authRoute from './modules/auth/auth.route'
import userRoute from './modules/users/user.route'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import { initializeSocketHandlers } from "./sockets"
import multer from 'multer'
import path from "path"

// multer is needed to parse form data body from the client
// const storage = multer({ dest: 'uploads/'})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles')
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
})


export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const app = express();
const server = http.createServer(app)


export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  }
});

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

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);


initializeSocketHandlers(io);


server.listen(8080, () => {
  console.log('Server running on  http://localhost:8080');
});