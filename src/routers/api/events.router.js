const express = require('express');
const router = express.Router();
const socketio = require('socket.io');

const eventsRouter = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('Usuario conectado:', socket.id);

        socket.on('disconnect', () => {
            console.log('Usuario desconectado:', socket.id);
        });
    });

    return router;
};

module.exports = eventsRouter;
