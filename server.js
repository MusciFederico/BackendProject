const { engine } = require('express-handlebars');
const hbs = require('hbs')
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const UsersFs = require('./server/src/data/fs/users.fs');
const ProductsFs = require('./server/src/data/fs/products.fs');
const OrdersFs = require('./server/src/data/fs/orders.fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const usersManager = new UsersFs(path.join(__dirname, 'server', 'src', 'data', 'fs', 'files', 'users.json'));
const productsManager = new ProductsFs(path.join(__dirname, 'server', 'src', 'data', 'fs', 'files', 'products.json'));
const ordersManager = new OrdersFs(path.join(__dirname, 'server', 'src', 'data', 'fs', 'files', 'orders.json'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.engine('js', engine())
app.set('view engine', 'hbs')
// app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'server', 'src', 'views', 'layouts'));



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'views' directory
app.use('/views', express.static(path.join(__dirname, 'views')));

// Users routes
app.get('/api/users', async (req, res) => {
    try {
        const allUsers = await usersManager.read();
        if (allUsers.length > 0) {
            res.json({
                statusCode: 200,
                response: allUsers
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error reading users."
        });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = await usersManager.create(newUser);
        res.status(201).json({
            statusCode: 201,
            response: createdUser
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error creating user."
        });
    }
});

app.get('/api/users/:uid', async (req, res) => {
    const userId = req.params.uid;
    try {
        const user = await usersManager.readOne(userId);
        if (user) {
            res.json({
                statusCode: 200,
                response: user
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error reading user."
        });
    }
});

// Products routes
app.get('/api/products', async (req, res) => {
    try {
        const allProducts = await productsManager.read();
        if (allProducts.length > 0) {
            res.json({
                statusCode: 200,
                response: allProducts
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error reading products."
        });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productsManager.create(newProduct);
        res.status(201).json({
            statusCode: 201,
            response: createdProduct
        });

        // Emit new product to update real-time view
        io.emit('newProduct', newProduct);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error creating product."
        });
    }
});

app.get('/api/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const product = await productsManager.readOne(productId);
        if (product) {
            res.json({
                statusCode: 200,
                response: product
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error reading product."
        });
    }
});

app.put('/api/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const updatedProduct = await productsManager.update(productId, req.body);
        if (updatedProduct) {
            res.json({
                statusCode: 200,
                response: updatedProduct
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error updating product."
        });
    }
});

app.delete('/api/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {
        const deleted = await productsManager.destroy(productId);
        if (deleted) {
            res.json({
                statusCode: 200,
                response: "Product deleted successfully"
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error deleting product."
        });
    }
});

// Orders routes
app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = req.body;
        const createdOrder = await ordersManager.create(newOrder);
        res.status(201).json({
            statusCode: 201,
            response: createdOrder
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error creating order."
        });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const allOrders = await ordersManager.read();
        if (allOrders.length > 0) {
            res.json({
                statusCode: 200,
                response: allOrders
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error reading orders."
        });
    }
});

app.get('/api/orders/:oid', async (req, res) => {
    const orderId = req.params.oid;
    try {
        const order = await ordersManager.readOne(orderId);
        if (order) {
            res.json({
                statusCode: 200,
                response: order
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error reading order."
        });
    }
});

// Add a route to serve the homepage
app.get('/', async (req, res) => {
    try {
        const allProducts = await productsManager.read();
        res.render('home', { title: 'Commerce Home', products: allProducts });
    } catch (error) {
        console.error('Error reading products:', error);
        res.status(500).send('Internal Server Error');
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
    // sendProductsToClient(socket);

    // Receive request for products from the client
    socket.on('getProducts', () => {
        // sendProductsToClient(socket);
    });

    // Receive new product from the client
    socket.on('newProduct', async (newProduct) => {
        try {
            // Save the new product to the backend file
            const createdProduct = await productsManager.create(newProduct);

            // Emit all products to update the real-time view for all clients
            // sendProductsToClients();
        } catch (error) {
            console.error('Error creating new product:', error);
        }
    });


    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

// Function to send products to all connected clients
// async function sendProductsToClients() {
//     try {
//         const allProducts = await productsManager.read();
//         if (allProducts.length > 0) {
//             io.emit('products', allProducts);
//         }
//     } catch (error) {
//         console.error('Error reading products:', error);
//     }
// }

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});