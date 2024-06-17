import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import CustomError from "../../utils/customError.js";
import errors from "../../utils/errorLibrary.js";
import logger from "../../utils/logger/logger.factory.js";

class MongoManager {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const one = await this.model.create(data);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async read({ filterObj, sortObj }) {
        try {
            console.log("mongo", filterObj, sortObj);
            // Initialize query and sortQuery objects
            let query = {};
            let sortQuery = {};

            // Check if filterObj is defined and not empty
            if (filterObj && Object.keys(filterObj).length > 0) {
                query = filterObj;
            }

            // Check if sortObj is defined and not empty
            if (sortObj && Object.keys(sortObj).length > 0) {
                sortQuery = sortObj;
            }

            // Perform the query using model.find() with the filter and sort criteria
            const all = await this.model.find(query).sort(sortQuery);

            if (all.length === 0) {
                CustomError.new(errors.notFound); // Throw an error if no results are found
            }

            return all; // Return the query results
        } catch (error) {
            throw error; // Throw any encountered errors back to the caller
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findById(id);
            if (!one) {
                CustomError.new(errors.notFound)
            }
            return one;
        } catch (error) {
            throw error;
        }
    }

    async readByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            // if (!user) {
            //     const error = new Error(`User with email ${email} not found`);
            //     error.statusCode = 404;
            //     throw error;
            // }

            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const opt = { new: true };
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            if (!one) {
                CustomError.new(errors.notFound)
            }
            return one;
        } catch (error) {
            throw error;
        }
    }

    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id);
            if (!one) {
                CustomError.new(errors.notFound)
            }
            return one;
        } catch (error) {
            throw error;
        }
    }

    async report(uid) {
        try {
            const orders = await Order.find({ user_id: uid });

            if (orders.length === 0) {
                CustomError.new(errors.notFound)
            }

            let totalCost = 0;

            for (const order of orders) {
                if (!order.product_id) { continue }
                totalCost += order.product_id.price * order.quantity;
            }

            return totalCost;
        } catch (error) {
            logger.WARN("Error al calcular el costo total:", error);
            throw error;
        }
    }

    async readOrdersById(uid) {
        try {
            const orders = await Order.find({ user_id: uid });
            logger.INFO("orders manage, Orders:", orders);

            if (orders.length === 0) {
                return "El usuario no tiene órdenes.";
            }

            const ordersWithSummedQuantities = {};
            for (const order of orders) {
                if (!order.product_id) { continue }
                const productId = order.product_id._id.toString();

                if (ordersWithSummedQuantities[productId]) {
                    ordersWithSummedQuantities[productId].quantity += order.quantity;
                } else {
                    ordersWithSummedQuantities[productId] = {
                        ...order._doc,
                        quantity: order.quantity
                    };
                }
            }

            return Object.values(ordersWithSummedQuantities);
        } catch (error) {
            logger.ERROR("Error al buscar ordenes del usuario:", error);
            throw error;
        }
    }
}



export default MongoManager
