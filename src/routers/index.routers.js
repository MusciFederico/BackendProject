// import passport from '../middlewares/passport.mid.js';
// import CustomRouter from './Customrouter.js';

// import productsRouter from './api/products.router.js';
// import ordersRouter from './api/orders.router.js';
// import usersRouter from './api/users.router.js';
// import sessionsRouter from './api/session.router.js';
// import eventsRouter from './api/events.router.js';

// import viewsHomeRouter from './views/home.router.js';
// import viewsRealTimeProductsRouter from './views/real-time-products.router.js';
// import viewsProductFormRouter from './views/product-form.router.js';
// import viewsRegistrationRouter from './views/registration.router.js';
// import viewsLoginRouter from './views/login.router.js';
// import viewsUserOrdersrouter from './views/user-orders.router.js';

// export default class IndexRouter extends CustomRouter {
//     init() {
//         this.use('/api/users', usersRouter);
//         this.use('/api/products', productsRouter);
//         this.use('/api/orders', passport.authenticate("jwt", { session: false }), ordersRouter);
//         this.use("/sessions", sessionsRouter);

//         this.use('/events', eventsRouter);

//         this.use('/', viewsHomeRouter);
//         this.use('/real', viewsRealTimeProductsRouter);
//         this.use('/products/form', viewsProductFormRouter);
//         this.use('/auth/register', viewsRegistrationRouter);
//         this.use('/auth/login', viewsLoginRouter);
//         this.use('/orders', viewsUserOrdersrouter);
//     }
// }


import passport from '../middlewares/passport.mid.js';
import CustomRouter from './CustomRouter.js';
import sendSms from '../utils/sendSms.js';

import productsRouter from './api/products.router.js';
import ordersRouter from './api/orders.router.js';
import usersRouter from './api/users.router.js';
import sessionsRouter from './api/session.router.js';
import eventsRouter from './api/events.router.js';

import viewsHomeRouter from './views/home.router.js';
import viewsRealTimeProductsRouter from './views/real-time-products.router.js';
import viewsProductFormRouter from './views/product-form.router.js';
import viewsRegistrationRouter from './views/registration.router.js';
import viewsLoginRouter from './views/login.router.js';
import viewsUserOrdersrouter from './views/user-orders.router.js';

export default class IndexRouter extends CustomRouter {
    init() {
        this.use('/api/users', usersRouter);
        this.use('/api/products', productsRouter);
        this.use('/api/orders', ordersRouter);
        this.use("/sessions", sessionsRouter);

        this.use('/events', eventsRouter);

        this.use('/', viewsHomeRouter);
        this.use('/real', viewsRealTimeProductsRouter);
        this.use('/products/form', viewsProductFormRouter);
        this.use('/auth/register', viewsRegistrationRouter);
        this.use('/auth/login', viewsLoginRouter);
        this.use('/orders', viewsUserOrdersrouter);
    }
}
