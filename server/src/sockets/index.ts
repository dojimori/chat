import { Server } from "socket.io";
import { chatsHandler } from "./handlers/chats.handler";
import { usersHandler } from "./handlers/users.handler";

// this will have all the active users
export const users = new Map<string, {
    'id': number,
    'username': string,
    'displayName': string
    'profilePicture': string
}>();
export const initializeSocketHandlers = (io: Server) => {
    // Socket Events
    io.on('connection', (socket) => {
        console.log('user connected');
        chatsHandler(io, socket);
        usersHandler(io, socket);
    });
}