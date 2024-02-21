import express from 'express';
import { Server as socketio } from 'socket.io'; // Importa Server de socket.io


const eventsRouter = (server) => {
    const router = express.Router(); // si se quiere usa en otros lados 
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('Usuario conectado:', socket.id);

        socket.on('disconnect', () => {
            console.log('Usuario desconectado:', socket.id);
        });
    });

    return router;
};

export default eventsRouter;
