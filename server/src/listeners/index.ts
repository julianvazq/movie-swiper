import { Server, Socket } from 'socket.io';

module.exports = (io: Server) => {
    const { onTest } = require('./test')(io);

    const onConnection = (socket: Socket) => {
        // console.log(io);
        socket.on('test', onTest);
        socket.emit('test-response', { hello: 'hi' });

        console.log('user connected --', socket.id);
        socket.on('disconnect', () => {
            console.log('disconnected', socket.id);
        });
    };

    io.on('connection', onConnection);
};
