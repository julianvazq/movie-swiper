import { Server, Socket } from 'socket.io';

module.exports = (io: Server) => {
    const changeUserName = function (data: {
        roomId: string;
        userId: string;
        name: string;
    }) {
        const socket: Socket = this;
        try {
            socket.to(data.roomId).emit('user:name-change', {
                userId: data.userId,
                name: data.name,
            });
        } catch (error) {
            console.log('Failed to change user name.', error);
        }
    };

    return { changeUserName };
};
