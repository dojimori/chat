
import express from "express"
import http from 'http'
import { Server } from 'socket.io'
import { initializeSocketHandlers } from "./sockets"
import path from "path"


/* routes */
import authRoutes from './modules/auth/auth.route'
import usersRoutes from './modules/users/users.route'
import chatsRoutes from './modules/chats/chats.route'
import postsRoutes from './modules/posts/posts.route'
/* end routes */


/* middlewares */
import { errorHandler } from "./middleware/error.middleware"
import session from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from "cookie-parser"
/* end middlewares */


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
app.use(cookieParser())


const root = process.cwd();

app.use('/uploads', express.static(path.join(root, 'uploads')))
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/posts', postsRoutes);
app.use(errorHandler)

initializeSocketHandlers(io);
server.listen(8080, () => {
  console.log('Server running on  http://localhost:8080');
});

