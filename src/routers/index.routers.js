const express = require('express');
const router = express.Router();

// Importar los enrutadores
const apiUsersRouter = require('./api/users.router');
const apiProductsRouter = require('./api/products.router');
const apiOrdersRouter = require('./api/orders.router');
const eventsRouter = require('./api/events.router');

// Montar las rutas de API
router.use('/api/users', apiUsersRouter);
router.use('/api/products', apiProductsRouter);
router.use('/api/orders', apiOrdersRouter);

// Montar las rutas de eventos
router.use('/events', eventsRouter);

// Importar y montar las rutas de vistas
const viewsHomeRouter = require('./views/home.router');
const viewsRealTimeProductsRouter = require('./views/real-time-products.router');
const viewsProductFormRouter = require('./views/product-form.router');
const viewsRegistrationRouter = require('./views/registration.router');

router.use('/', viewsHomeRouter);
router.use('/real', viewsRealTimeProductsRouter);
router.use('/form', viewsProductFormRouter);
router.use('/register', viewsRegistrationRouter);

module.exports = router;
