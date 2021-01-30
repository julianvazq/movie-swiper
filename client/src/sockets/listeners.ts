import { socket } from '.';

export const onTest = () => {
    return socket.on('test', () => {
        console.log('this is a test');
    });
};
