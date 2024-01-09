const express = require('express');
const morgan = require('morgan');

const UsersFs = require('./fs/users.fs'); // Reemplazar con la ruta correcta
const ProductsFs = require('./fs/products.fs'); // Reemplazar con la ruta correcta
const OrdersFs = require('./fs/orders.fs'); // Reemplazar con la ruta correcta

const app = express();

const usersManager = new UsersFs('C:/Projects/projectbackend/server/src/data/fs/files/users.json'); // Reemplazar con la ruta correcta
const productsManager = new ProductsFs('C:/Projects/projectbackend/server/src/data/fs/files/products.json'); // Reemplazar con la ruta correcta
const ordersManager = new OrdersFs('C:/Projects/projectbackend/server/src/data/fs/files/orders.json'); // Reemplazar con la ruta correcta

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('¡Hola! Esta es la página principal.');
});

// Users routes
app.get('/api/users', (req, res) => {
    const allUsers = usersManager.read();
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
});

app.post('/api/users', (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = usersManager.create(newUser);
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

app.get('/api/users/:uid', (req, res) => {
    const userId = req.params.uid;
    const user = usersManager.readOne(userId);
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
});

// Products routes
app.get('/api/products', (req, res) => {
    const allProducts = productsManager.read();
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
});

app.post('/api/products', (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = productsManager.create(newProduct);
        res.status(201).json({
            statusCode: 201,
            response: createdProduct
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error creating product."
        });
    }
});

app.get('/api/products/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = productsManager.readOne(productId);

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
});

app.put('/api/products/:pid', (req, res) => {
    const productId = req.params.pid;
    try {
        const updatedProduct = productsManager.update(productId, req.body);
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

app.delete('/api/products/:pid', (req, res) => {
    const productId = req.params.pid;
    try {
        const deleted = productsManager.destroy(productId);
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
app.post('/api/orders', (req, res) => {
    try {
        const newOrder = req.body;
        const createdOrder = ordersManager.create(newOrder);
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

app.get('/api/orders', (req, res) => {
    const allOrders = ordersManager.read(); // Asume que tienes un ordersManager para manejar las órdenes
    if (allOrders.length > 0) {
        res.json({
            statusCode: 200,
            response: allOrders
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            response: "No se encontraron órdenes"
        });
    }
});

app.get('/api/orders/:oid', (req, res) => {
    const orderId = req.params.oid;
    const order = ordersManager.readOne(orderId);
    if (order) {
        res.json({
            statusCode: 200,
            response: order
        });
    } else {
        res.status(404).json({
            statusCode: 404,
            response: "Order not found!"
        });
    }
});

app.delete('/api/orders/:oid', (req, res) => {
    const orderId = req.params.oid;
    try {
        const deleted = ordersManager.destroy(orderId);
        if (deleted) {
            res.json({
                statusCode: 200,
                response: "Order deleted successfully"
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: "Order not found!"
            });
        }
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            response: "Error deleting order."
        });
    }
});

// Middleware for internal server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        statusCode: 500,
        response: "Algo salió mal!"
    });
});

// Middleware for handling routes not found
app.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        response: "Ruta no encontrada"
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
