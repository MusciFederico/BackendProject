import CustomRouter from '../CustomRouter.js';
import path from 'path';
import { payment } from '../../controllers/checkout.controller.js'

class CheckoutRouter extends CustomRouter {
    init() {
        this.create('/', ["USER", "PREM"], payment);
    }
};

const checkoutRouter = new CheckoutRouter();
export default checkoutRouter.getRouter();
