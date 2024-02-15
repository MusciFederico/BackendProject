import express from 'express';
import path from 'path';
import isAdminMid from '../../middlewares/isAdmin.mid.js';

// import ProductsFs from '../../data/fs/products.fs.js';
// const productsManager = new ProductsFs('./src/data/fs/files/products.json');

import { productsManager } from '../../data/mongo/manager.mongo.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const { filter, sort } = req.query;
        const filterObj = filter ? JSON.parse(filter) : {};
        const sortObj = sort ? JSON.parse(sort) : {};
        const allProducts = await productsManager.read({ filter: filterObj, sort: sortObj });

        if (allProducts && allProducts.length > 0) {
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

router.post('/', isAdminMid, async (req, res, next) => {
    try {
        const { name, price, stock, img, place } = req.body;
        const numericPrice = parseFloat(price);
        const numericStock = parseInt(stock);

        if (isNaN(numericPrice) || isNaN(numericStock)) {
            const conversionError = new Error('Invalid price or stock format');
            conversionError.statusCode = 400;
            throw conversionError;
        }

        const newProduct = {
            name,
            img,
            place,
            price: numericPrice,
            stock: numericStock,
        };

        const createdProduct = await productsManager.create(newProduct);

        res.status(201).json({
            statusCode: 201,
            response: createdProduct
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:pid', async (req, res, next) => {
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

router.put('/:pid', async (req, res, next) => {
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

router.delete('/:pid', async (req, res, next) => {
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

export default router;
