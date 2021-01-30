module.exports = (io) => {
    const onTest = function (arg) {
        const socket = this;
        console.log('listener test passed');
        socket.emit('test-response');
    };

    return { onTest };
};
