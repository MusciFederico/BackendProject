import express from 'express';
const router = express.Router();

import apiUsersRouter from './api/users.router.js';
import apiProductsRouter from './api/products.router.js';
import apiOrdersRouter from './api/orders.router.js';
import sessionRouter from './api/session.router.js';
import eventsRouter from './api/events.router.js';

router.use('/api/users', apiUsersRouter);
router.use('/api/products', apiProductsRouter);
router.use('/api/orders', apiOrdersRouter);
router.use("/sessions", sessionRouter);

router.use('/events', eventsRouter);

import viewsHomeRouter from './views/home.router.js';
import viewsRealTimeProductsRouter from './views/real-time-products.router.js';
import viewsProductFormRouter from './views/product-form.router.js';
import viewsRegistrationRouter from './views/registration.router.js';
import viewsLoginRouter from './views/login.router.js';


router.use('/', viewsHomeRouter);
router.use('/real', viewsRealTimeProductsRouter);
router.use('/products/form', viewsProductFormRouter);
router.use('/auth/register', viewsRegistrationRouter);
router.use('/auth/login', viewsLoginRouter); 

export default router;

