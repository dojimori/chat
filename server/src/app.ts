import express,  { Request, Response } from "express"
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use(express.json())

// Socket Events
io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat:message', (data) => {
    io.emit('chat:message', data); 
    console.log('received: ', data)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});