import express from 'express';
import { Server as socketio } from 'socket.io'; // Importa Server de socket.io
import logger from '../../utils/logger/logger.factory.js';

const eventsRouter = (server) => {
    const router = express.Router(); // si se quiere usa en otros lados 
    const io = socketio(server);

    io.on('connection', (socket) => {
        logger.INFO('Usuario conectado:', socket.id);

        socket.on('disconnect', () => {
            logger.INFO('Usuario desconectado:', socket.id);
        });
    });

    return router;
};

export default eventsRouter;

// import CustomRouter from '../Customrouter.js';
// import { Server as SocketIOServer } from 'socket.io';

// class EventsRouter extends CustomRouter {
//     constructor(server) {
//         super();
//         this.io = new SocketIOServer(server);
//         this.init();
//     }

//     init() {
//         this.io.on('connection', (socket) => {
//             console.log('Usuario conectado:', socket.id);

//             socket.on('disconnect', () => {
//                 console.log('Usuario desconectado:', socket.id);
//             });

//             // Aquí puedes definir más eventos de Socket.IO
//         });
//     }
// }

// const eventsRouter = new EventsRouter();
// export default eventsRouter.getRouter();
