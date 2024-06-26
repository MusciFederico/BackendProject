import passport from '../middlewares/passport.mid.js';
import CustomRouter from './CustomRouter.js';
import sendSms from '../utils/sendSms.js';
import { Router } from "express"

import productsRouter from './api/products.router.js';
import ordersRouter from './api/orders.router.js';
import usersRouter from './api/users.router.js';
import sessionsRouter from './api/session.router.js';
import eventsRouter from './api/events.router.js';
import checkoutRouter from './api/checkout.router.js';

import viewsHomeRouter from './views/home.router.js';
import viewsRealTimeProductsRouter from './views/real-time-products.router.js';
import viewsProductFormRouter from './views/product-form.router.js';
import viewsRegistrationRouter from './views/registration.router.js';
import viewsLoginRouter from './views/login.router.js';
import viewsUserOrdersrouter from './views/user-orders.router.js';
import viewsCartRouter from './views/cart.router.js';
import viewsThanksRouter from './views/thanks.router.js';
import viewsProfileRouter from './views/profile.router.js';
import viewsDetailsRouter from './views/details.router.js';
import viewsProductsRouter from './views/myProducts.router.js';

import testingRouter from './api/test.router.js';

const router = Router();

export default class IndexRouter extends CustomRouter {
    init() {
        this.use("/sessions", sessionsRouter);
        this.use('/api/users', usersRouter);
        this.use('/api/products', productsRouter);
        this.use('/api/orders', ordersRouter);
        this.use("/checkout", checkoutRouter);

        // this.use('/events', eventsRouter);

        this.use('/', viewsHomeRouter);
        this.use('/details', viewsDetailsRouter);
        // this.use('/real', viewsRealTimeProductsRouter);
        this.use('/products/form', viewsProductFormRouter);
        this.use('/auth/register', viewsRegistrationRouter);
        this.use('/auth/login', viewsLoginRouter);
        // this.use('/orders', viewsUserOrdersrouter);
        this.use('/test', testingRouter);
        this.use('/cart', viewsCartRouter);
        this.use('/thanks', viewsThanksRouter);
        this.use('/profile', viewsProfileRouter);
        this.use('/products', viewsProductsRouter);
    }
}
