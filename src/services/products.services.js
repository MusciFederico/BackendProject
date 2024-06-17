import productsRep from "../repositories/products.rep.js";

class ProductsService {
    constructor() {
        this.productsRep = productsRep
    };
    create = async (data) => {
        try {
            const response = await this.productsRep.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    read = async ({ filterObj, sortObj }) => {
        try {
            const response = await this.productsRep.read({ filterObj, sortObj });
            return response
        } catch (error) {
            throw error;
        }
    }
    readOne = async (id) => {
        try {
            const response = await this.productsRep.readOne(id);
            return response
        } catch (error) {
            throw error;
        }
    }
    update = async (id, data) => {
        try {
            const response = await this.productsRep.update(id, data);
            return response
        } catch (error) {
            throw error;
        }
    }
    destroy = async (id) => {
        try {
            const response = await this.productsRep.destroy(id);
            return response
        } catch (error) {
            throw error;
        }
    }
}

const productsService = new ProductsService();
export default productsService;