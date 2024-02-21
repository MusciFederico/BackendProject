import express from 'express';
const router = express.Router();
import path from 'path';

// import OrderFs from '../../data/fs/orders.fs.js';
// const ordersManager = new OrderFs('./src/data/fs/files/orders.json');

import { ordersManager } from '../../data/mongo/manager.mongo.js';

router.get('/', async (req, res, next) => {
    try {
        const { filter, sort } = req.query;
        const allOrders = await ordersManager.read({ filter, sort });
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

router.put('/:oid', async (req, res, next) => {
    const orderId = req.params.oid;
    try {
        const updatedOrder = await ordersManager.update(orderId, req.body);
        if (updatedOrder) {
            res.json({
                statusCode: 200,
                response: updatedOrder
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

router.delete('/:oid', async (req, res, next) => {
    const orderId = req.params.oid;
    try {
        const deletedOrder = await ordersManager.destroy(orderId);
        if (deletedOrder) {
            res.json({
                statusCode: 200,
                response: deletedOrder
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

router.get('/total/:uid', async (req, res, next) => {
    const userId = req.params.uid;
    try {
        const totalCost = await ordersManager.report(userId);
        res.json({
            statusCode: 200,
            response: { totalCost }
        });
    } catch (error) {
        next(error);
    }
});

export default router;

