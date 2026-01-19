import { app } from "./app";
import http from 'http'
import { Server } from 'socket.io'
import { initializeSocketHandlers } from "./sockets"

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  }
});

initializeSocketHandlers(io);
server.listen(8080, () => {
  console.log('Server running on  http://localhost:8080');
});

