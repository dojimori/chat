import { Server } from "socket.io";
import { chatHandler } from "./handlers/chat.handler";
import { userHandler } from "./handlers/user.handler";

export const users = new Map<string, { 'id': number, 'username': string }>();
export const initializeSocketHandlers = (io: Server) => {
    // Socket Events
    io.on('connection', (socket) => {
        console.log('user connected');
        chatHandler(io, socket);
        userHandler(io, socket);
    });
}