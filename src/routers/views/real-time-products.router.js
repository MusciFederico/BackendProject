
import express from 'express';
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
        let email;


        if (req.cookies.token) {
            const token = req.cookies.token;
            const data = verifytoken(token);
            role = data.role;
            email = data.email; // Assuming the token contains userId
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

        const allProducts = await productsManager.read();

        res.render('real-time-products', {
            name: 'Real-Time Products',
            products: allProducts,
            [role]: true
        });
    } catch (error) {
        next(error);
    }
});

export default router;
