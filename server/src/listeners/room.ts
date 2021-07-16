import { Room, Server, Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';
import { SocketCallback } from '../types';
import { SocketWithUserId } from '../types/socketio';
import { Participant } from './../types/index';

module.exports = (io: Server) => {
    const createRoom = function (
        data: { roomId: string | null },
        callback: SocketCallback
    ) {
        try {
            const socket: SocketWithUserId = this;
            socket.leaveAll();
            for (const roomId in socket.rooms) {
                socket
                    .to(roomId)
                    .emit('room:leave', { socketId: socket.userId });
            }
            const roomId = data.roomId || uuid();
            socket.join(roomId);
            console.log('new room: ', io.sockets.adapter.rooms[roomId]);

            callback({
                success: true,
                data: {
                    roomId,
                },
            });
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

    const changeRoomOwner = function (data: {
        roomId: string;
        userId: string;
    }) {
        try {
            io.to(data.roomId).emit('room:owner-change', {
                newOwnerId: data.userId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        createRoom,
        joinRoom,
        sendRoom,
        checkRoom,
        changeRoomOwner,
    };
};
