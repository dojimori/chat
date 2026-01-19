import { Server, Socket } from "socket.io"
import { users } from "..";
import { UserService } from "../../modules/users/users.service";
import { UserRepository } from "../../modules/users/users.repository";
import chatService from "../../modules/chats/chats.service";


const userRepo = new UserRepository();
const userService = new UserService(userRepo);


export const chatsHandler = (io: Server, socket: Socket) => {
    socket.on('chat:message', async (data) => {
        const messenger = users.get(socket.id)
        const { message, time } = data;
        console.log(data)
        io.emit('chat:message', {
            message,
            time,
            user: messenger
        });

        const user = await userService.findById(data.userId)

        if (!user) {
            return;
        }

        await chatService.create(message, 'chat', user.id);
    });
}