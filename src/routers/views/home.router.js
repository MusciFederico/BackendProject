const express = require('express');
const router = express.Router();
const path = require('path');
const ProductsFs = require('../../data/fs/products.fs'); // Ajusta la ruta según sea necesario
const productsManager = new ProductsFs(path.join(__dirname, '..', '..', 'data', 'fs', 'files', 'products.json'));


// Route to serve the homepage
router.get('/', async (req, res, next) => {
    try {
        const allProducts = await productsManager.read();
        res.render('home', { title: 'Commerce Home', products: allProducts });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
