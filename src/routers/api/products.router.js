const express = require('express');
const router = express.Router();
const path = require('path');

const ProductsFs = require('../../data/fs/products.fs');
const productsManager = new ProductsFs(path.join(__dirname, '..', '..', 'data', 'fs', 'files', 'products.json'));

// const { productsManager } = require('../../data/mongo/manager.mongo');

router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
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
        // No se emiten eventos aquí porque este router no tiene acceso a io
    } catch (error) {
        // Manejar errores y pasarlos al siguiente middleware
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

module.exports = router;
