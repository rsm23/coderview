'use strict';

const socketIO = require('socket.io');

module.exports = (server) => {
    let io = socketIO(server);

    io.on('connection', (socket) => {
        socket.on('chatMessage', (data) => {
            io.emit('Message', data);
        });
    });
}