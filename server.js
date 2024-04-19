
// import env from "./src/utils/env.js"
// import express from 'express';
// import { engine } from 'express-handlebars';
// import hbs from 'hbs';
// import http from 'http';
// import { Server as socketIo } from 'socket.io';
// import morgan from 'morgan';
// import path from 'path';
// import bodyParser from 'body-parser';
// import expressSession from 'express-session';
// import cookieParser from 'cookie-parser';
// import MongoStore from 'connect-mongo';
// import sessionFileStore from 'session-file-store';
// import cors from 'cors';

// import dbConnection from './src/utils/db.js';
// import args from "./src/utils/args.js";
// import productsFs from './src/data/fs/products.fs.js';
// import errorHandler from './src/middlewares/errorHandler.mid.js';
// import IndexRouter from './src/routers/index.routers.js';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// const app = express();
// const server = http.createServer(app);
// const io = new socketIo(server);

// app.use(bodyParser.urlencoded({ extended: true }));


// console.log(args);
// // console.log(productsManager);

// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// app.set('view engine', 'hbs');
// app.set('views', './src/views');

// app.use('/views', express.static('./views'));

// const FileStore = sessionFileStore(expressSession);

// app.use(cookieParser(env.SECRET_KEY));

// // app.use(expressSession({
// //     secret: env.SECRET_KEY,
// //     resave: true,
// //     saveUninitialized: true,
// //     cookie: { maxAge: 60000 },
// // }))

// // server.use(// probablemente app.use
// //     expressSession({
// //         secret: env.SECRET_KEY,
// //         resave:
// //             true,
// //         saveUninitialized: true,
// //         store:
// //             new FileStore({
// //                 path: "./src/data/fs/files/sessions",
// //                 ttl:
// //                     10000,
// //                 retries: 2,
// //             }),
// //     })
// // );
// app.use(expressSession({
//     secret: env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     store: MongoStore.create({
//         mongoUrl: env.DB_LINK,
//         ttl: 7 * 24 * 60 * 60 // 7 days
//     })
// }));

// // store: new MongoStore({
// //     ttl: 10,
// //     mongoUrl: env.DB_LINK
// //     })
// //     }))

// app.use(
//     cors({
//         origin: true,
//         credentials: true,
//     }))

// app.use(bodyParser.json());

// app.use(errorHandler);

// const router = new IndexRouter();
// app.use(router.getRouter());

// // Socket.io events
// io.on('connection', (socket) => {
//     console.log('Usuario conectado:', socket.id);

//     // Emit products to the client on connection
//     sendProductsToClient(socket);

//     // Receive request for products from the client
//     socket.on('getProducts', () => {
//         sendProductsToClient(socket);
//     });

//     // Receive new product from the client
//     socket.on('newProduct', async (newProduct) => {
//         try {
//             // Save the new product to the backend file
//             console.log("Nuevo producto recibido:", newProduct);
//             const createdProduct = await productsFs.create(newProduct);
//             console.log("productos creados", createdProduct);
//             // Emit all products to update the real-time view for all clients
//             sendProductsToClient(socket);
//         } catch (error) {
//             console.error('Error creating new product:', error);
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log('Usuario desconectado:', socket.id);
//     });
// });

// async function sendProductsToClient(socket) {
//     try {
//         const allProducts = await productsFs.read();
//         if (allProducts.length > 0) {
//             socket.emit('products', allProducts);
//         }
//     } catch (error) {
//         console.error('Error reading products:', error);
//     }
// }

// const PORT = env.PORT || 8080;
// server.listen(PORT, () => {
//     console.log(`Servidor Express escuchando en el puerto ${PORT}`);
//     dbConnection();
// });

import env from "./src/utils/env.js"
import express from 'express';
import { engine } from 'express-handlebars';
import hbs from 'hbs';
import http from 'http';
import { Server as socketIo } from 'socket.io';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import sessionFileStore from 'session-file-store';
import cors from 'cors';
import compression from "express-compression";

import dbConnection from './src/utils/db.js';
import args from "./src/utils/args.js";
import winstonMid from "./src/middlewares/winston.mid.js";
import logger from "./src/utils/logger/logger.factory.js";

import productsFs from './src/data/fs/products.fs.js';
import errorHandler from './src/middlewares/errorHandler.mid.js';
import IndexRouter from './src/routers/index.routers.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));

logger.INFO(`environment: ${args.env}`);

app.use(morgan('dev'));
app.use(winstonMid);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/views', express.static('./views'));

const FileStore = sessionFileStore(expressSession);

app.use(cookieParser(env.SECRET_KEY));

// app.use(expressSession({
//     secret: env.SECRET_KEY,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
// }))

// server.use(// probablemente app.use
//     expressSession({
//         secret: env.SECRET_KEY,
//         resave:
//             true,
//         saveUninitialized: true,
//         store:
//             new FileStore({
//                 path: "./src/data/fs/files/sessions",
//                 ttl:
//                     10000,
//                 retries: 2,
//             }),
//     })
// );
app.use(expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: env.DB_LINK,
        ttl: 7 * 24 * 60 * 60 // 7 days
    })
}));

// store: new MongoStore({
//     ttl: 10,
//     mongoUrl: env.DB_LINK
//     })
//     }))

app.use(
    cors({
        origin: true,
        credentials: true,
    }))

app.use(bodyParser.json());

app.use(errorHandler);

const router = new IndexRouter();
app.use(router.getRouter());

app.use(compression({ brotli: { enabled: true, zlib: {} } }));

// Socket.io events
io.on('connection', (socket) => {
    logger.INFO('Usuario conectado:', socket.id);

    // Emit products to the client on connection
    sendProductsToClient(socket);

    // Receive request for products from the client
    socket.on('getProducts', () => {
        sendProductsToClient(socket);
    });

    // Receive new product from the client
    socket.on('newProduct', async (newProduct) => {
        try {
            // Save the new product to the backend file
            logger.INFO("Nuevo producto recibido:", newProduct);
            const createdProduct = await productsFs.create(newProduct);
            logger.INFO("productos creados", createdProduct);
            // Emit all products to update the real-time view for all clients
            sendProductsToClient(socket);
        } catch (error) {
            logger.INFO('Error creating new product:', error);
        }
    });

    socket.on('disconnect', () => {
        logger.INFO('Usuario desconectado:', socket.id);
    });
});

async function sendProductsToClient(socket) {
    try {
        const allProducts = await productsFs.read();
        if (allProducts.length > 0) {
            socket.emit('products', allProducts);
        }
    } catch (error) {
        logger.INFO('Error reading products:', error);
    }
}

const PORT = env.PORT || 8080;
server.listen(PORT, () => {
    logger.INFO(`Servidor Express escuchando en el puerto ${PORT}`);
    dbConnection();
});