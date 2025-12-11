import { Server, Socket } from "socket.io";
import { users } from "..";

const onDisconnectHandler = (io: Server, socket: Socket) => {
    const user = users.get(socket.id);
    if (user) {
        io.emit('left', `${user.username} left the chat`)
        users.delete(socket.id)
    }
}

export const userHandler = (io: Server, socket: Socket) => {
    socket.on('join', (data) => {
        // console.log(`${username} joined.`)
        users.set(socket.id, {
            username: data.username, 
            id: data.id, 
            displayName: data.displayName,
            profilePicture: data.profilePicture
        });

        io.emit('active-users', Array.from(users.values()));
        console.log(users) 
        io.emit('joined', `${data.displayName || data.username} joined the chat`)
    })


    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })

    socket.on('stop_typing', (data) => {
        socket.broadcast.emit('stop_typing');
    })

    socket.on('left', () => {
        onDisconnectHandler(io, socket)
    });

    socket.on('disconnect', () => {
        onDisconnectHandler(io, socket)
    });
}