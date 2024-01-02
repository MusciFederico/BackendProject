const express = require('express');
const UsersFs = require('./fs/users.fs'); // Reemplaza con la ruta correcta
const ProductsFs = require('./fs/products.fs'); // Reemplaza con la ruta correcta
const app = express();

// Crear instancias de UsersFs y ProductsFs con las rutas de los archivos JSON
const usersManager = new UsersFs('C:/Projects/projectbackend/server/data/fs/files/users.json'); // Reemplaza con la ruta correcta
const productsManager = new ProductsFs('C:/Projects/projectbackend/server/data/fs/files/products.json'); // Reemplaza con la ruta correcta

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola! Esta es la página principal.');
});

// Rutas para usuarios
app.get('/api/users', (req, res) => {
    const allUsers = usersManager.read();
    if (allUsers.length > 0) {
        res.json({
            success: true,
            response: allUsers
        });
    } else {
        res.status(404).json({
            success: false,
            message: "not found!"
        });
    }
});

app.post('/api/users', (req, res) => {
    try {
        const newUser = req.body;
        const createdUser = usersManager.create(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user."
        });
    }
});

// Ruta para obtener un usuario por ID
app.get('/api/users/:uid', (req, res) => {
    const userId = req.params.uid;
    const user = usersManager.readOne(userId);
    if (user) {
        res.json({
            success: true,
            response: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: "not found!"
        });
    }
});

// Rutas para productos
app.get('/api/products', (req, res) => {
    const allProducts = productsManager.read();
    if (allProducts.length > 0) {
        res.json({
            success: true,
            response: allProducts
        });
    } else {
        res.status(404).json({
            success: false,
            message: "not found!"
        });
    }
});

app.post('/api/products', (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = productsManager.create(newProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating product."
        });
    }
});

app.get('/api/products/:pid', (req, res) => {
    const productId = req.params.pid; // El parámetro es string
    const product = productsManager.readOne(productId);

    if (product) {
        res.json({
            success: true,
            response: product
        });
    } else {
        res.status(404).json({
            success: false,
            message: "not found!"
        });
    }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
