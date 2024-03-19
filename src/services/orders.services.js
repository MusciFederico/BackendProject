import { ordersManager } from '../data/mongo/manager.mongo.js'

class OrdersService {
    constructor() {
        this.model = ordersManager
    };
    create = async (newOrder) => {
        try {
            const response = await this.model.create(newOrder);
            return response;
        } catch (error) {
            throw error;
        }
    }
    read = async ({ filter, sort }) => {
        try {
            const response = await this.model.read({ filter: filter, sort: sort });
            return response
        } catch (error) {
            throw error;
        }
    }
    readOne = async (orderId) => {
        try {
            const response = await this.model.readOne(orderId);
            return response
        } catch (error) {
            throw error;
        }
    }
    update = async (orderId, data) => {
        try {
            const response = await this.model.update(orderId, data);
            return response
        } catch (error) {
            throw error;
        }
    }
    destroy = async (orderId) => {
        try {
            const response = await this.model.destroy(orderId);
            return response
        } catch (error) {
            throw error;
        }
    }
    report = async (userId) => {
        try {
            const response = await this.model.report(userId);
            return response
        } catch (error) {
            throw error;
        }
    }
}

const ordersService = new OrdersService();
export default ordersService;