const UsersFs = require('./src/data/fs/users.fs');
const ProductsFs = require('./src/data/fs/products.fs');
const OrdersFs = require('./src/data/fs/orders.fs');

require('dotenv').config();
const { engine } = require('express-handlebars');
const hbs = require('hbs');
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const dbConnection = require('./src/utils/db')
// import "dotenv/config.js";
const errorHandler = require('./src/middlewares/errorHandler.mid');
// const productsRouter = require('./src/routers/index.routers');
const mainRouter = require('./src/routers/index.routers');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(mainRouter);

const usersManager = new UsersFs(path.join(__dirname, 'src', 'data', 'fs', 'files', 'users.json'));
const productsManager = new ProductsFs(path.join(__dirname, 'src', 'data', 'fs', 'files', 'products.json'));
const ordersManager = new OrdersFs(path.join(__dirname, 'src', 'data', 'fs', 'files', 'orders.json'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

app.use(errorHandler);



// Socket.io events
io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

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
            const createdProduct = await productsManager.create(newProduct);

            // Emit all products to update the real-time view for all clients
            sendProductsToClient(socket);
        } catch (error) {
            console.error('Error creating new product:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

async function sendProductsToClient(socket) {
    try {
        const allProducts = await productsManager.read();
        if (allProducts.length > 0) {
            socket.emit('products', allProducts);
        }
    } catch (error) {
        console.error('Error reading products:', error);
    }
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    dbConnection();
});