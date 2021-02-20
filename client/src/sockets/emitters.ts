import { Participant } from './../../../server/src/types/index';
import { socket } from '.';
import { Room } from '../types/room';
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

export const addMovie = (
    data: { roomId: string; movie: AddedMovie },
    callback: (res: SocketResponse<{ movieId: string }>) => void,
) => {
    socket.emit('movie:add', data, callback);
};
