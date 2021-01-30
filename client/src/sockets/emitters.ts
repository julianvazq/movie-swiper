import { socket } from '.';

export const emitTest = (arg: any) => {
    socket.emit('test', arg, () => {
        console.log('this is a test');
    });
};
