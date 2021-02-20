import { Server, Socket } from 'socket.io';
import { SocketCallback } from '../types';
import { AddedMovie } from '../types/movies';

module.exports = (io: Server) => {
    const addMovie = function (
        data: { roomId: string; movie: AddedMovie },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;
            console.log('added movie: ', data.movie.title);

            io.in(data.roomId).emit('movie:add', {
                movie: data.movie,
            });

            callback({
                success: true,
                data: { movieId: data.movie.id },
            });
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: `Failed to add movie: ${data.movie.title}`,
            });
        }
    };

    return { addMovie };
};
