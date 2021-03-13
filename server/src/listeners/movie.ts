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
            console.log('added movie: ', data.movie.title, data.movie.id);

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

    const removeMovie = function (
        data: { roomId: string; movieId: number },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;
            console.log('removed movie: ', data.movieId);

            io.in(data.roomId).emit('movie:remove', {
                movieId: data.movieId,
            });

            callback({
                success: true,
                data: { movieId: data.movieId },
            });
        } catch (error) {
            console.log(error);
            callback({
                success: false,
                message: `Failed to add movie: ${data.movieId}`,
            });
        }
    };

    const swipeMovie = function (
        data: {
            roomId: string;
            movieId: number;
            userId: string;
            liked: boolean;
        },
        callback: SocketCallback
    ) {
        try {
            const socket: Socket = this;
            console.log('swiped', data.liked);
            io.in(data.roomId).emit('movie:swipe', {
                movieId: data.movieId,
                userId: data.userId,
                liked: data.liked,
            });

            // callback({
            //     success: true,
            //     data: {
            //         movieId: data.movieId,
            //         userId: data.userId,
            //         liked: data.liked,
            //     },
            // });
        } catch (error) {
            console.log(error);
            // callback({
            //     success: false,
            //     message: `Failed to add movie: ${data.movieId}`,
            // });
        }
    };

    return { addMovie, removeMovie, swipeMovie };
};
