import { Server } from 'socket.io';
import { SocketCallback } from '../types';

module.exports = (io: Server) => {
    const toggleReady = function (
        data: { roomId: string; userId: string },
        callback: SocketCallback
    ) {
        try {
            io.in(data.roomId).emit('user:ready', {
                userId: data.userId,
            });

            callback({ success: true, data: { userId: data.userId } });
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: 'Failed to toggle ready state.',
            });
        }
    };

    const changeUserName = function (data: {
        roomId: string;
        userId: string;
        name: string;
    }) {
        try {
            io.in(data.roomId).emit('user:name-change', {
                userId: data.userId,
                name: data.name,
            });
        } catch (error) {
            console.log('Failed to change user name.', error);
        }
    };

    return { changeUserName, toggleReady };
};
