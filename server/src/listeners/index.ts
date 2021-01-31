import { Server, Socket } from 'socket.io';

module.exports = (io: Server) => {
    const { onTest } = require('./test')(io);
    const { createRoom, joinRoom } = require('./room')(io);

    const onConnection = (socket: Socket) => {
        // console.log(io);
        socket.on('test', onTest);
        socket.emit('test-response', { hello: 'hi' });

        socket.on('room:create', createRoom);
        socket.on('room:join', joinRoom);

        console.log('user connected --', socket.id);
        socket.on('disconnect', () => {
            console.log('disconnected', socket.id);
        });
    };

    io.on('connection', onConnection);
};
