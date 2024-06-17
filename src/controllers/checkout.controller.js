import checkoutService from '../services/checkout.services.js';
import CustomError from '../utils/customError.js';
import errors from '../utils/errorLibrary.js';
import usersManager from '../data/mongo/users.mongo.js';

class CheckoutController {
    constructor() {
        this.service = checkoutService;
    }

    payment = async (req, res, next) => {
        try {
            const id = req.user._id;
            const response = await this.service.payment(id);
            res.success201(response)
        } catch (error) {
            next(error);
        }
    }
}

export default CheckoutController;
const controler = new CheckoutController();
const { payment } = controler
export { payment };