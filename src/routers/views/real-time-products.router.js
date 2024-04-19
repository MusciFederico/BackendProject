
// import express from 'express';
// import { productsManager } from '../../data/mongo/manager.mongo.js';
// import { verifytoken } from '../../utils/token.js';

// const router = express.Router();

// router.get('/', async (req, res, next) => {
//     const role0 = 'role0';
//     const role1 = 'role1';
//     const roleUnd = 'roleUnd';

//     try {
//         let role;
//         if (req.cookies.token) {
//             const token = req.cookies
//             const data = verifytoken(token);
//             role = data.role
//         }

//         if (role === 0) {
//             role = role0;
//         } else if (role === 1) {
//             role = role1;
//         } else {
//             role = roleUnd;
//         }

//         const allProducts = await productsManager.read();

//         res.render('real-time-products', {
//             name: 'Real-Time Products',
//             products: allProducts,
//             [role]: true
//         });
//     } catch (error) {
//         next(error);
//     }
// });

// export default router;

import express from 'express';
import productsManager from '../../data/mongo/products.mongo.js';
import { verifytoken } from '../../utils/token.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const role0 = 'role0';
    const role1 = 'role1';
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
