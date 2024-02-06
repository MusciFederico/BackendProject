const { engine } = require('express-handlebars');
const hbs = require('hbs');
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const UsersFs = require('./src/data/fs/users.fs');
const ProductsFs = require('./src/data/fs/products.fs');
const OrdersFs = require('./src/data/fs/orders.fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

// Users routes
app.get('/api/users', async (req, res, next) => {
    try {
        const allUsers = await usersManager.read();
        if (allUsers.length > 0) {
            res.json({
                statusCode: 200,
                response: allUsers
            });
        } else {
            const notFoundError = new Error("Users not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

app.post('/api/users', async (req, res, next) => {
    try {
        const newUser = req.body;
        const createdUser = await usersManager.create(newUser);
        res.status(201).json({
            statusCode: 201,
            response: createdUser
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/users/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    try {
        const user = await usersManager.readOne(userId);
        if (user) {
            res.json({
                statusCode: 200,
                response: user
            });
        } else {
            const notFoundError = new Error("User not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

// Products routes
app.get('/api/products', async (req, res, next) => {
    try {
        const allProducts = await productsManager.read();
        if (allProducts.length > 0) {
            res.json({
                statusCode: 200,
                response: allProducts
            });
        } else {
            const notFoundError = new Error("Products not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

app.post('/api/products', async (req, res, next) => {
    try {
        // Obtener datos del nuevo producto desde el cuerpo de la solicitud
        const { title, price, stock } = req.body;

        // Convertir el precio y el stock a valores numéricos
        const numericPrice = parseFloat(price);
        const numericStock = parseInt(stock);

        // Verificar si la conversión fue exitosa
        if (isNaN(numericPrice) || isNaN(numericStock)) {
            // Si la conversión falla, devolver un error
            const conversionError = new Error('Invalid price or stock format');
            conversionError.statusCode = 400; // Bad Request
            throw conversionError;
        }

        // Crear el nuevo objeto de producto con los valores numéricos
        const newProduct = {
            title,
            price: numericPrice,
            stock: numericStock,
        };

        // Crear el producto en el sistema de archivos
        const createdProduct = await productsManager.create(newProduct);

        // Responder con el producto creado
        res.status(201).json({
            statusCode: 201,
            response: createdProduct
        });

        // Emitir el nuevo producto para actualizar la vista en tiempo real
        io.emit('newProduct', newProduct);
    } catch (error) {
        // Manejar errores y pasarlos al siguiente middleware
        next(error);
    }
});


app.get('/api/products/:pid', async (req, res, next) => {
    const productId = req.params.pid;
    try {
        const product = await productsManager.readOne(productId);
        if (product) {
            res.json({
                statusCode: 200,
                response: product
            });
        } else {
            const notFoundError = new Error("Product not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

app.put('/api/products/:pid', async (req, res, next) => {
    const productId = req.params.pid;
    try {
        const updatedProduct = await productsManager.update(productId, req.body);
        if (updatedProduct) {
            res.json({
                statusCode: 200,
                response: updatedProduct
            });
        } else {
            const notFoundError = new Error("Product not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

app.delete('/api/products/:pid', async (req, res, next) => {
    const productId = req.params.pid;
    try {
        const deleted = await productsManager.destroy(productId);
        if (deleted) {
            res.json({
                statusCode: 200,
                response: "Product deleted successfully"
            });
        } else {
            const notFoundError = new Error("Product not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

// Orders routes
app.post('/api/orders', async (req, res, next) => {
    try {
        const newOrder = req.body;
        const createdOrder = await ordersManager.create(newOrder);
        res.status(201).json({
            statusCode: 201,
            response: createdOrder
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/orders', async (req, res, next) => {
    try {
        const allOrders = await ordersManager.read();
        if (allOrders.length > 0) {
            res.json({
                statusCode: 200,
                response: allOrders
            });
        } else {
            const notFoundError = new Error("Orders not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

app.get('/api/orders/:oid', async (req, res, next) => {
    const orderId = req.params.oid;
    try {
        const order = await ordersManager.readOne(orderId);
        if (order) {
            res.json({
                statusCode: 200,
                response: order
            });
        } else {
            const notFoundError = new Error("Order not found");
            notFoundError.statusCode = 404;
            next(notFoundError);
        }
    } catch (error) {
        next(error);
    }
});

// Add a route to serve the homepage
app.get('/', async (req, res, next) => {
    try {
        const allProducts = await productsManager.read();
        res.render('home', { title: 'Commerce Home', products: allProducts });
    } catch (error) {
        next(error);
    }
});

// Add a route to serve the real-time products page
app.get('/real', (req, res) => {
    res.render('real-time-products', { title: 'Real-Time Products' });
});

// Add a route to serve the form page
app.get('/form', (req, res) => {
    res.render('product-form', { title: 'Product Form' });
});

// Add a route to serve the registration page
app.get('/register', (req, res) => {
    res.render('registration', { title: 'Registration Form' });
});

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


// Middleware for handling errors
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        response: err.message || "Internal Server Error"
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
