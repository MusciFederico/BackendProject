import ordersService from '../services/orders.services.js';

class OrdersController {
    constructor() {
        this.service = ordersService;
    }

    create = async (req, res, next) => {
        try {
            const newOrder = req.body;
            const createdOrder = await this.service.create(newOrder);
            res.success201(createdOrder)
        } catch (error) {
            next(error);
        }
    }
    read = async (req, res, next) => {
        try {
            const { filter, sort } = req.query;
            const allOrders = await this.service.read({ filter, sort });
            if (allOrders.length > 0) {
                res.success201(allOrders)

            } else {
                const notFoundError = new Error("Orders not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
    readOne = async (req, res, next) => {
        const orderId = req.params.oid;
        try {
            const order = await this.service.readOne(orderId);
            if (order) {
                res.success201(order)

            } else {
                const notFoundError = new Error("Order not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
    update = async (req, res, next) => {
        const orderId = req.params.oid;
        const data = req.body
        try {
            const updatedOrder = await this.service.update(orderId, data);
            if (updatedOrder) {
                res.success200(updatedOrder);
            } else {
                const notFoundError = new Error("Order not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
    destroy = async (req, res, next) => {
        const orderId = req.params.oid;
        try {
            const deletedOrder = await this.service.destroy(orderId);
            if (deletedOrder) {
                res.success201(deletedOrder)

            } else {
                const notFoundError = new Error("Order not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
    report = async (req, res, next) => {
        const userId = req.params.uid;
        try {
            const totalCost = await this.service.report(userId);
            res.success201(totalCost) /// desestructuracion ignorada
        } catch (error) {
            next(error);
        }
    }
}

export default OrdersController;
const controler = new OrdersController();
const { create, read, readOne, update, destroy } = controler
export { create, read, readOne, update, destroy };