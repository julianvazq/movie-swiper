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
            callback({ success: false, message: 'Failed to create room.' });
        }
    };

    const joinRoom = function (
        data: { roomId: string; user: Participant },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;

            socket.join(data.roomId, () => {
                socket.to(data.roomId).emit('room:new-join', {
                    socketId: socket.id,
                    user: data.user,
                });
            });

            callback({
                success: true,
                data: { roomId: data.roomId },
            });

            console.log('EVENT: joined room', {
                roomId: data.roomId,
                sockets: io.sockets.adapter.rooms[data.roomId].sockets,
                length: io.sockets.adapter.rooms[data.roomId].length,
            });
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: `Failed to join the room: ${data.roomId}`,
            });
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
                (io.sockets.adapter.rooms[data.roomId] &&
                    io.sockets.adapter.rooms[data.roomId].length) ||
                0;

            if (clientsInRoom > 0) {
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

    const toggleReady = function (
        data: { roomId: string; userId: string },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;
            io.in(data.roomId).emit('room:ready', {
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

    return {
        createRoom,
        joinRoom,
        sendRoom,
        checkRoom,
        toggleReady,
    };
};
