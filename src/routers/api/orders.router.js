const express = require('express');
const router = express.Router();
const path = require('path');
const OrderFs = require('../../data/fs/orders.fs');
const ordersManager = new OrderFs(path.join(__dirname, '..', '..', 'data', 'fs', 'files', 'orders.json'));

router.get('/', async (req, res, next) => {
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

// Crear una nueva orden
router.post('/', async (req, res, next) => {
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

// Obtener una orden por su ID
router.get('/:oid', async (req, res, next) => {
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

module.exports = router;
