import { Server } from "socket.io";

export const initializeSocketHandlers = (io: Server) => {
    const users = new Map<string, { 'id': number, 'username': string }>();
    // Socket Events
    io.on('connection', (socket) => {
        console.log('user connected');

        socket.on('chat:message', (data) => {
            io.emit('chat:message', {
                message: data.message,
                time: data.time,
                user: users.get(socket.id)
            });
            // const user = users.get(socket.id);
            // console.log(`received: from ${user}`, data)
        });


        /*
          add joined users to the map  
          so we can track them
        */
        socket.on('join', (data) => {
            // console.log(`${username} joined.`)
            users.set(socket.id, { username: data.username, id: data.id });
            io.emit('joined', `${data.username} joined the chat`)
        })

        socket.on('disconnect', () => {
            const user = users.get(socket.id);
            if (user) {
                io.emit('left', `${user.username} left the chat`)
                users.delete(socket.id)

            }
        });

        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', data);
        })

        socket.on('stop_typing', (data) => {
            socket.broadcast.emit('stop_typing');
        })

        socket.on('left', () => {
            const user = users.get(socket.id);
            if (user) {
                io.emit('left', `${user.username} left the chat`)
                users.delete(socket.id)
            }
        });


    });
}