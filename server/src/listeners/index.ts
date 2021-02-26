import { Server } from 'socket.io';
import { Participant } from '../types';
import { SocketWithUserId } from '../types/socketio';

module.exports = (io: Server) => {
    const {
        createRoom,
        joinRoom,
        sendRoom,
        checkRoom,
        toggleReady,
    } = require('./room')(io);
    const { addMovie, removeMovie } = require('./movie')(io);

    const onConnection = (socket: SocketWithUserId) => {
        /* Room */
        socket.on('room:create', createRoom);
        socket.on('room:check', checkRoom);
        socket.on('room:join', joinRoom);
        socket.on('room:send', sendRoom);
        socket.on('room:ready', toggleReady);
        /* Movie */
        socket.on('movie:add', addMovie);
        socket.on('movie:remove', removeMovie);
        /* Connect / Disconnect */
        socket.on('user:new', (user: Participant) => {
            socket.userId = user.id;
            console.log('user connected: ', user);
        });
        socket.on('disconnecting', () => {
            console.log('disconnected', socket.userId);
            for (const roomId in socket.rooms) {
                socket
                    .to(roomId)
                    .emit('room:leave', { socketId: socket.userId });
            }
        });
    };

    io.on('connection', onConnection);
};
