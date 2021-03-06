import { Participant } from './../../../server/src/types/index';
import { socket } from '.';
import { SocketResponse } from '../types/socket';
import { AddedMovie } from '../types/movies';

export const emitTest = (arg: any) => {
    socket.emit('test', arg, () => {
        console.log('this is a test');
    });
};

export const createRoom = (callback: (res: SocketResponse<{ roomId: string }>) => void) => {
    socket.emit('room:create', null, callback);
};

export const checkRoom = (data: { roomId: string }, callback: (res: SocketResponse<{ roomId: string }>) => void) => {
    socket.emit('room:check', data, callback);
};

export const joinRoom = (
    data: { roomId: string; user: Participant },
    callback: (res: SocketResponse<{ roomId: string }>) => void,
) => {
    socket.emit('room:join', data, callback);
};

export const toggleReady = (
    data: { roomId: string; userId: string },
    callback?: (res: SocketResponse<{ userId: string }>) => void,
) => {
    socket.emit('room:ready', data, callback);
};

export const addMovie = (
    data: { roomId: string; movie: AddedMovie },
    callback: (res: SocketResponse<{ movieId: string }>) => void,
) => {
    socket.emit('movie:add', data, callback);
};

export const removeMovie = (
    data: { roomId: string; movieId: number },
    callback: (res: SocketResponse<{ movieId: string }>) => void,
) => {
    socket.emit('movie:remove', data, callback);
};

export const swipeMovie = (
    data: { roomId: string; movieId: number; userId: string; liked: boolean },
    callback?: (res: SocketResponse<{ movieId: string }>) => void,
) => {
    socket.emit('movie:swipe', data, callback);
};

export const startSwiper = (data: { roomId: string }, callback?: (res: SocketResponse<{ roomId: string }>) => void) => {
    socket.emit('swiper:start', data, callback);
};
