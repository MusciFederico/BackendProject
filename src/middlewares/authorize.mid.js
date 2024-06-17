import logger from '../utils/logger/logger.factory.js';
import CustomError from '../utils/customError.js';
import errors from '../utils/errorLibrary.js';
import ordersManager from '../data/mongo/orders.mongo.js';
import productManager from '../data/mongo/products.mongo.js';

const authorizeRoles = ({ idParam = 'uid', idSource = 'params', checkOrder = false, checkProduct = false }) => {
    return async (req, res, next) => {
        const userRole = req.user.role;
        const userId = req.user._id.toString();
        const userEmail = req.user.email
        let owner
        let paramId;

        if (idSource === 'params') {
            paramId = req.params[idParam];
        } else if (idSource === 'body') {
            paramId = req.body[idParam];
        } else if (idSource === 'query') {
            paramId = req.query[idParam];
        } else {
            CustomError.new(errors.fatal)
        }

        if (checkProduct) {
            try {
                const product = await productManager.readOne(paramId);
                if (!product) {
                    CustomError.new(errors.notFound);
                }
                if (product.owner) {
                    owner = product.owner.toString();
                }
                if (userRole === 1 || owner === userId) {
                    return next(); // Admins can access any user's data or user is accessing their own data
                } else {
                    CustomError.new(errors.forbidden);
                }
            } catch (error) {
                return next(error); // Propagate the error to the Express error handling middleware
            }
        }
        if (checkOrder) {
            try {
                const order = await ordersManager.readOne(paramId);
                if (!order) {
                    CustomError.new(errors.notFound);
                }

                const orderId = order.user_id.toString();
                if (userRole === 1 || orderId === userId) {
                    return next(); // Admins can access any user's data or user is accessing their own data
                } else {
                    CustomError.new(errors.forbidden);
                }
            } catch (error) {
                return next(error); // Propagate the error to the Express error handling middleware
            }
        } else {
            try {
                if (userRole === 1 || userId === paramId) {
                    return next();
                }
                if (userRole === 1 || userEmail === paramId) {
                    return next(); // Admins can access any user's data or user is accessing their own data
                } else {
                    CustomError.new(errors.forbidden);
                }
            } catch (error) {
                return next(error); // Propagate the error to the Express error handling middleware
            }
        }
    };
};

export default authorizeRoles;