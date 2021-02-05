import { Participant } from './../../../server/src/types/index';
import { socket } from '.';
import { Room } from '../types/room';

export const onTest = () => {
    return socket.on('test', () => {
        console.log('this is a test');
    });
};

export const onConnection = (callback: (socketId: string) => void) => {
    return socket.on('connect', callback);
};

export const onParticipantJoin = (room: Room, callback: (user: Participant) => void) => {
    return socket.on('room:newjoin', (data: { socketId: string; user: Participant }) => {
        console.log('new join: ', data.user);
        console.log(room);
        socket.emit('room:send', { socketId: data.socketId, room });
        callback(data.user);
    });
};

export const onParticipantLeave = (callback: (data: { socketId: string }) => void) => {
    return socket.once('room:leave', callback);
};

export const onGetRoom = (callback: (data: { room: Room }) => void) => {
    return socket.once('room:get', callback);
};
