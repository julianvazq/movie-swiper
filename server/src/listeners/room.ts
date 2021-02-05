import { Participant } from './../types/index';
import { Room, Server, Socket } from 'socket.io';
import { SocketCallback } from '../types';
import { v4 as uuid } from 'uuid';

module.exports = (io: Server) => {
    const createRoom = function (data, callback: SocketCallback) {
        try {
            const socket: Socket = this;
            const roomId = uuid();
            socket.join(roomId);
            console.log('new room: ', io.sockets.adapter.rooms[roomId]);

            const resData = {
                roomId,
            };
            callback({ success: true, data: resData });
        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = function (
        data: { roomId: string; user: Participant },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;

            socket.join(data.roomId, () => {
                socket
                    .to(data.roomId)
                    .emit('room:newjoin', {
                        socketId: socket.id,
                        user: data.user,
                    });
            });

            // EMIT TO EVERYONE THAT SOCKET JOINED

            console.log(
                'joined room: ',
                data.roomId,
                io.sockets.adapter.rooms[data.roomId].sockets
            );
        } catch (error) {
            console.log(error);
        }
    };

    const sendRoom = function (data: { socketId: string; room: Room }) {
        try {
            const socket: Socket = this;
            io.to(data.socketId).emit('room:get', { room: data.room });
        } catch (error) {
            console.log(error);
        }
    };

    const checkRoom = function (
        data: { roomId: string },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;

            const clientsInRoom =
                (io.sockets.adapter &&
                    io.sockets.adapter.rooms[data.roomId] &&
                    io.sockets.adapter.rooms[data.roomId].sockets) ||
                {};
            const roomExists = Object.keys(clientsInRoom).length > 0;
            console.log(`clients in room: ${data.roomId} `, clientsInRoom);

            if (roomExists) {
                callback({
                    success: true,
                    data: { roomId: data.roomId },
                });
            } else {
                callback({
                    success: false,
                    message: 'Room does not exist or has expired.',
                });
            }
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: 'Socket error in checkRoom.',
            });
        }
    };

    return { createRoom, joinRoom, sendRoom, checkRoom };
};
