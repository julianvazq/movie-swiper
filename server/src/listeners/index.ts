import { Server } from 'socket.io';
import { Participant } from '../types';
import { SocketWithUserId } from '../types/socketio';

module.exports = (io: Server) => {
    const {
        createRoom,
        joinRoom,
        sendRoom,
        checkRoom,
        changeRoomOwner,
    } = require('./room')(io);
    const { addMovie, removeMovie, swipeMovie } = require('./movie')(io);
    const { startSwiper } = require('./swiper')(io);
    const { changeUserName, toggleReady } = require('./user')(io);

    const onConnection = (socket: SocketWithUserId) => {
        /* Room */
        socket.on('room:create', createRoom);
        socket.on('room:check', checkRoom);
        socket.on('room:join', joinRoom);
        socket.on('room:send', sendRoom);
        socket.on('room:owner-change', changeRoomOwner);
        /* Movie */
        socket.on('movie:add', addMovie);
        socket.on('movie:remove', removeMovie);
        socket.on('movie:swipe', swipeMovie);
        /* Swiper */
        socket.on('swiper:start', startSwiper);
        /* User */
        socket.on('user:ready', toggleReady);
        socket.on('user:name-change', changeUserName);
        /* Connect */
        socket.on('user:new', (user: Participant) => {
            socket.userId = user.id;
            console.log('user connected: ', user);
        });
        /* Disconnect */
        socket.on('disconnecting', () => {
            const roomsIds = Object.keys(io.sockets.adapter.rooms).filter(
                (roomId) => io.sockets.adapter.rooms[roomId].length > 1
            );

            roomsIds.forEach((roomId) => {
                const roomSocketIds = Object.keys(
                    io.sockets.adapter.rooms[roomId].sockets
                ).filter((id) => id !== socket.id);
                const randomNewOwnerId = roomSocketIds[0];
                socket.to(roomId).emit('room:leave', {
                    socketId: socket.userId,
                    newOwnerSocketId: randomNewOwnerId,
                });
            });
        });
    };

    io.on('connection', onConnection);
};
