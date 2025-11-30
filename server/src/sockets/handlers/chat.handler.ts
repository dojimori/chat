import { Server, Socket } from "socket.io"
import { users } from "..";

export const chatHandler = (io: Server, socket: Socket) => {
    socket.on('chat:message', (data) => {
        io.emit('chat:message', {
            message: data.message,
            time: data.time,
            user: users.get(socket.id)
        });
        // const user = users.get(socket.id);
        // console.log(`received: from ${user}`, data)
    });
}