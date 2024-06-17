import ordersRep from '../repositories/orders.rep.js'

class OrdersService {
    constructor() {
        this.ordersRep = ordersRep
    };
    create = async (data) => {
        try {
            const response = await this.ordersRep.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    read = async ({ filter, sort }) => {
        try {
            const response = await this.ordersRep.read({ filter: filter, sort: sort });
            return response
        } catch (error) {
            throw error;
        }
    }
    readOne = async (id) => {
        try {
            const response = await this.ordersRep.readOne(id);
            return response
        } catch (error) {
            throw error;
        }
    }
    update = async (id, data) => {
        try {
            const response = await this.ordersRep.update(id, data);
            return response
        } catch (error) {
            throw error;
        }
    }
    destroy = async (id) => {
        try {
            const response = await this.ordersRep.destroy(id);
            return response
        } catch (error) {
            throw error;
        }
    }
    report = async (uId) => {
        try {
            const response = await this.ordersRep.report(uId);
            return response
        } catch (error) {
            throw error;
        }
    }
    readOrdersById = async (uId) => {
        try {
            const response = await this.ordersRep.readOrdersById(uId);
            return response
        } catch (error) {
            throw error;
        }
    }
}

const ordersService = new OrdersService();
export default ordersService;