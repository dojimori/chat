import express,  { Request, Response } from "express"
import http from 'http'
import { Server } from 'socket.io'
import authRoute from './routes/auth.route'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use(morgan('dev'))
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(session({
  secret: "secrethehehe",
  resave: false,
  saveUninitialized: false
}))
app.use('/api/auth', authRoute);


const users = new Map();


// app.get('/api/users', async(req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users)
//   } catch(error) {
//     console.log(error)
//   }
// })


// Socket Events
io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat:message', (data) => {
    io.emit('chat:message', {
        message: data.message,
        time: data.time,
        username: users.get(socket.id)
    }); 
    const user = users.get(socket.id);
    console.log(`received: from ${user}`, data)
  });


  /*
    add joined users to the map  
    so we can track them
  */
  socket.on('join', (username) => {
    console.log(`${username} joined.`)
    users.set(socket.id, username);
    io.emit('joined', `${username} joined the chat`)
  })

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    io.emit('left', `${username} left the chat`)
  });

});

server.listen(8080, () => {
  console.log('Server running on  http://localhost:8080');
});