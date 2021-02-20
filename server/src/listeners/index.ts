import { Server, Socket } from 'socket.io';

module.exports = (io: Server) => {
    const { onTest } = require('./test')(io);
    const { createRoom, joinRoom, sendRoom, checkRoom } = require('./room')(io);
    const { addMovie } = require('./movie')(io);

    const onConnection = (socket: Socket) => {
        // console.log(io);
        socket.on('test', onTest);
        // socket.emit('test-response', { hello: 'hi' });

        socket.on('room:create', createRoom);
        socket.on('room:check', checkRoom);
        socket.on('room:join', joinRoom);
        socket.on('room:send', sendRoom);

        socket.on('movie:add', addMovie);

        console.log('user connected --', socket.id);
        socket.on('disconnecting', () => {
            console.log('disconnected', socket.id);
            console.log('was in rooms: ', socket.rooms);
            for (const roomId in socket.rooms) {
                socket.to(roomId).emit('room:leave', { socketId: socket.id });
            }
        });
    };

    io.on('connection', onConnection);
};
