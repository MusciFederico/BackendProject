import express from 'express';
import path from 'path';

// import ProductsFs from '../../data/fs/products.fs.js';
// const productsManager = new ProductsFs('./src/data/fs/files/products.json');

import { productsManager } from '../../data/mongo/manager.mongo.js';

const router = express.Router();

// Ruta para servir la página de inicio
router.get('/', async (req, res, next) => {
    try {
        const allProducts = await productsManager.read();
        console.log("estos son los productos", allProducts);
        res.render('home', { name: 'Commerce Home', products: allProducts });
    } catch (error) {
        next(error);
    }
});

export default router;
