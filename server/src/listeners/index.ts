import { Server, Socket } from 'socket.io';
import { Participant } from '../types';
import { SocketWithUserId } from '../types/socketio';

module.exports = (io: Server) => {
    const { onTest } = require('./test')(io);
    const { createRoom, joinRoom, sendRoom, checkRoom } = require('./room')(io);
    const { addMovie } = require('./movie')(io);

    const onConnection = (socket: SocketWithUserId) => {
        // console.log(io);
        socket.on('test', onTest);
        // socket.emit('test-response', { hello: 'hi' });

        socket.on('room:create', createRoom);
        socket.on('room:check', checkRoom);
        socket.on('room:join', joinRoom);
        socket.on('room:send', sendRoom);

        socket.on('movie:add', addMovie);

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
