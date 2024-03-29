import { productsManager } from '../data/mongo/manager.mongo.js'

class ProductsService {
    constructor() {
        this.model = productsManager
    };
    create = async (data) => {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    read = async ({ filterObj, sortObj }) => {
        try {
            const response = await this.model.read({ filter: filterObj, sort: sortObj });
            return response
        } catch (error) {
            throw error;
        }
    }
    readOne = async (pid) => {
        try {
            const response = await this.model.readOne(pid);
            return response
        } catch (error) {
            throw error;
        }
    }
    update = async (pid, data) => {
        try {
            const response = await this.model.update(pid, data);
            return response
        } catch (error) {
            throw error;
        }
    }
    destroy = async (pid) => {
        try {
            const response = await this.model.destroy(pid);
            return response
        } catch (error) {
            throw error;
        }
    }
}

const productsService = new ProductsService();
export default productsService;