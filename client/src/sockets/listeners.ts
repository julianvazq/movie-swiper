import { Participant } from './../../../server/src/types/index';
import { socket } from '.';
import { Room } from '../types/room';
import { AddedMovie } from '../types/movies';

export const onTest = () => {
    return socket.on('test', () => {
        console.log('this is a test');
    });
};

export const onConnection = (callback: (socketId: string) => void) => {
    return socket.on('connect', callback);
};

export const onParticipantJoin = (room: Room, callback: (user: Participant) => void) => {
    return socket.on('room:new-join', (data: { socketId: string; user: Participant }) => {
        console.log('new join: ', data.user);
        socket.emit('room:send', { socketId: data.socketId, room });
        callback(data.user);
    });
};

export const onParticipantLeave = (callback: (data: { socketId: string }) => void) => {
    return socket.on('room:leave', callback);
};

export const onGetRoom = (callback: (data: { room: Room }) => void) => {
    return socket.once('room:get', callback);
};

export const onMovieAdd = (callback: (movie: AddedMovie) => void) => {
    return socket.on('movie:add', (data: { movie: AddedMovie }) => {
        callback(data.movie);
    });
};

export const onMovieRemove = (callback: (data: { movieId: number }) => void) => {
    return socket.on('movie:remove', callback);
};

export const onMovieSwipe = (callback: (data: { movieId: number; userId: string; liked: boolean }) => void) => {
    return socket.on('movie:swipe', callback);
};

export const onToggleReady = (callback: (data: { userId: string }) => void) => {
    return socket.on('room:ready', callback);
};

export const onStartSwiper = (callback: (data: { roomId: string }) => void) => {
    return socket.on('swiper:start', callback);
};
