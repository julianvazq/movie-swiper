import { Server, Socket } from 'socket.io';
import { SocketCallback } from '../types';
import { v4 as uuid } from 'uuid';

module.exports = (io: Server) => {
    const createRoom = function (data, callback: SocketCallback) {
        try {
            const socket: Socket = this;
            const roomId = uuid();
            // socket.join(roomId);
            // console.log('rooms after creation: ', io.sockets.adapter.rooms);

            const resData = {
                roomId,
            };
            console.log(resData);
            callback({ success: true, data: resData });
        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = function (
        data: { roomId: string },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;
            console.log(io.sockets.adapter.rooms);
            console.log(data.roomId);
            let clientsInRoom = [];
            io.to(data.roomId).clients(
                (err, clients) => (clientsInRoom = clients)
            );
            console.log(clientsInRoom);
            const resData = {
                clients: clientsInRoom.length,
            };
            callback({ success: true, data: resData });
        } catch (error) {
            console.log(error);
        }
    };

    return { createRoom, joinRoom };
};
