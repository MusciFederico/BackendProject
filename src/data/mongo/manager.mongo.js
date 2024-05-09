// import User from "./models/user.model.js";
// import Product from "./models/product.model.js";
// import Order from "./models/order.model.js";

// class MongoManager {
//     constructor(model) {
//         this.model = model;
//     }

//     async create(data) {
//         try {
//             const one = await this.model.create(data);
//             return one;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async read(obj) {
//         try {
//             let query = {};

//             if (obj && obj.filter) {
//                 query = obj.filter;
//             }

//             let sortQuery = {};

//             if (obj && obj.sort) {
//                 sortQuery = obj.sort;
//             }

//             const all = await this.model.find(query).sort(sortQuery);

//             if (all.length === 0) {
//                 const error = new Error("There aren't products");
//                 error.statusCode = 404;
//                 throw error;
//             }
//             return all;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async readOne(id) {
//         try {
//             const one = await this.model.findById(id);
//             if (!one) {
//                 const error = new Error("There isn't product");
//                 error.statusCode = 404;
//                 throw error;
//             }
//             return one;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async readByEmail(email) {
//         try {
//             const user = await this.model.findOne({ email });
//             // if (!user) {
//             //     const error = new Error(`User with email ${email} not found`);
//             //     error.statusCode = 404;
//             //     throw error;
//             // }

//             return user;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async update(id, data) {
//         try {
//             const opt = { new: true };
//             const one = await this.model.findByIdAndUpdate(id, data, opt);
//             if (!one) {
//                 const error = new Error("There isn't product");
//                 error.statusCode = 404;
//                 throw error;
//             }
//             return one;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async destroy(id) {
//         try {
//             const one = await this.model.findByIdAndDelete(id);
//             if (!one) {
//                 const error = new Error("There isn't product");
//                 error.statusCode = 404;
//                 throw error;
//             }
//             return one;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async report(uid) {
//         try {
//             const orders = await Order.find({ user_id: uid });

//             if (orders.length === 0) {
//                 return "El usuario no tiene órdenes.";
//             }

//             let totalCost = 0;

//             for (const order of orders) {
//                 totalCost += order.product_id.price * order.quantity;
//             }

//             return totalCost;
//         } catch (error) {
//             console.error("Error al calcular el costo total:", error);
//             throw error;
//         }
//     }

//     async readOrdersById(uid) {
//         try {
//             const orders = await Order.find({ user_id: uid });
//             console.log("orders manager:", orders);
//             if (orders.length === 0) {
//                 return "El usuario no tiene órdenes.";
//             }
//             return orders;
//         } catch (error) {
//             console.error("Error al buscar ordenes del usuario:", error);
//             throw error;
//         }
//     }
// }



// export default MongoManager
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

    async read(obj) {
        try {
            let query = {};

            if (obj && obj.filter) {
                query = obj.filter;
            }

            let sortQuery = {};

            if (obj && obj.sort) {
                sortQuery = obj.sort;
            }

            const all = await this.model.find(query).sort(sortQuery);

            if (all.length === 0) {
                CustomError.new(errors.notFound)

            }
            return all;
        } catch (error) {
            throw error;
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
            logger.WARN("orders manager:", orders);
            if (orders.length === 0) {
                return "El usuario no tiene órdenes.";
            }
            return orders;
        } catch (error) {
            logger.WARN("Error al buscar ordenes del usuario:", error);
            throw error;
        }
    }
}



export default MongoManager


