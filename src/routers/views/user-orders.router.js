
import express from 'express';
import path from 'path';
import usersManager from '../../data/mongo/users.mongo.js';
import productsManager from '../../data/mongo/products.mongo.js';

import { verifytoken } from '../../utils/token.js';

const router = express.Router();

router.get('/', async (req, res, next) => {

    const role0 = 'role0';
    const role1 = 'role1';
    const role2 = 'role2';
    const roleUnd = 'roleUnd';

    try {
        let role;
        if (req.cookies.token) {
            const token = req.cookies
            const data = verifytoken(token);
            role = data.role
        }

        if (role === 0) {
            role = role0;
        } else if (role === 1) {
            role = role1;
        } else if (role === 2) {
            role = role2;
        } else {
            role = roleUnd;
        }

        const email = req.session.email
        const user = await usersManager.readByEmail(email)
        const _id = user._id
        const userOrders = await usersManager.readOrdersById(_id)


        res.render('orders', {
            name: 'Commerce orders',
            orders: userOrders,
            [role]: true
        });
    } catch (error) {
        next(error);
    }
});


export default router;

