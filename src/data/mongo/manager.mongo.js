// import User from "./models/user.model.js";
const User = require ("./models/user.model");
// import Product from "./models/product.model.js";
const Product = require ("./models/product.model");

class MongoManager {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const one = await this.model.create(data)
            return one.id
        } catch (error) {
            throw error;
        }
    }

    async read() {
        try {
            const all = await this.model.find()
            if (all.length === 0) {
                const error = new Error("There aren't products")
                error.statusCode = 404
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
            const one = await this.model.findById(id);
            if (!one) {
                const error = new Error("There isn't product"); error.statusCode = 404;
                throw error;
            }
            return one;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const opt = { new: true };
            const one = await this.model.findByIdAndUpdate(id, data, opt)
            if (!one) {
                const error = new Error("There isn't product"); error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async destroy(id) {
        try {
            const one = await this.model.findByIdAndDelete(id);
            if (!one) {
                const error = new Error("There isn't product"); error.statusCode = 404;
                throw error;
            }
            return one;
        } catch (error) {
            throw error;
        }
    }
}

const usersManager = new MongoManager(User);
const productsManager = new MongoManager(Product);
//const ordersManager = new MongoManager(Order);

// export { users, products }
module.exports = { usersManager, productsManager };
