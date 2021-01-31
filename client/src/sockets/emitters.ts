import { socket } from '.';
import { Room } from '../types/room';
import { SocketResponse } from '../types/socket';

export const emitTest = (arg: any) => {
    socket.emit('test', arg, () => {
        console.log('this is a test');
    });
};

export const createRoom = (callback: (res: SocketResponse<{ roomId: string }>) => void) => {
    socket.emit('room:create', null, callback);
};

export const joinRoom = (data: { roomId: string }, callback: (res: SocketResponse<{ room: Room }>) => void) => {
    socket.emit('room:get', data, callback);
};
