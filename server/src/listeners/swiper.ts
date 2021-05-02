import { Server } from 'socket.io';

module.exports = (io: Server) => {
    const startSwiper = function (data: { roomId: string }) {
        try {
            io.in(data.roomId).emit('swiper:start', {
                roomId: data.roomId,
            });
        } catch (error) {
            console.log('Failed to start swiper.', error);
        }
    };

    return { startSwiper };
};
