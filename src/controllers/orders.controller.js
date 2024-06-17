import ordersService from '../services/orders.services.js';
import CustomError from '../utils/customError.js';
import errors from '../utils/errorLibrary.js';

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
            const filterObj = filter ? JSON.parse(filter) : {};
            const sortObj = sort ? JSON.parse(sort) : {};
            const allOrders = await this.service.read({ filter: filterObj, sort: sortObj });

            if (allOrders && allOrders.length > 0) {
                res.success200(allOrders);
            } else {
                CustomError.new(errors.notFound)
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
                res.success200(order)
            } else {
                CustomError.new(errors.notFound)
            }
        } catch (error) {
            next(error);
        }
    }
    update = async (req, res, next) => {
        const orderId = req.params.oid;
        const data = req.body
        try {
            if (data.user_id === null || data.product_id === null || data.quantity === null || data.state === null ||
                data.user_id === "" || data.product_id === "" || data.state === "" || data.quantity === "") {
                CustomError.new(errors.error);
            }
            if (data.state) {
                if (data.state !== "reserved" && data.state !== "payed" && data.state !== "delivered") {
                    CustomError.new(errors.error);
                }
            }
            const updatedOrder = await this.service.update(orderId, data);
            if (updatedOrder) {
                res.success200(updatedOrder);
            } else {
                CustomError.new(errors.notFound)
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
                res.success200(deletedOrder)

            } else {
                CustomError.new(errors.notFound)
            }
        } catch (error) {
            next(error);
        }
    }
    report = async (req, res, next) => {
        const userId = req.params.uid;
        try {
            const totalCost = await this.service.report(userId);
            res.success200(totalCost)
        } catch (error) {
            next(error);
        }
    }
    readOrdersById = async (req, res, next) => {
        const userId = req.params.uid;
        try {
            const orders = await this.service.readOrdersById(userId);
            res.success200(orders)
        } catch (error) {
            next(error);
        }
    }
}

export default OrdersController;
const controler = new OrdersController();
const { create, read, readOne, update, destroy, report, readOrdersById } = controler
export { create, read, readOne, update, destroy, report, readOrdersById };
