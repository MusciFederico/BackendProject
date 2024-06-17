// import express from 'express';
// import path from 'path';
// import ordersManager from '../../data/mongo/orders.mongo.js';
// import usersManager from '../../data/mongo/users.mongo.js';

// import { verifytoken } from '../../utils/token.js';

// const router = express.Router();

// router.get('/', async (req, res, next) => {
//     const role0 = 'role0';
//     const role1 = 'role1';
//     const role2 = 'role2';
//     const roleUnd = 'roleUnd';


//     try {
//         let role;
//         let email;


//         if (req.cookies.token) {
//             const token = req.cookies.token;
//             const data = verifytoken(token);
//             role = data.role;
//             email = data.email; // Assuming the token contains userId
//         }

//         if (role === 0) {
//             role = role0;
//         } else if (role === 1) {
//             role = role1;
//         } else if (role === 2) {
//             role = role2;
//         } else {
//             role = roleUnd;
//         }

//         const user = await usersManager.readByEmail(email);
//         const orders = await ordersManager.readOrdersById(user._id)
//         res.render('thanks', {
//             name: 'Thanks!',
//             [role]: true // Pass the user role as a dynamic property
//         });
//     } catch (error) {
//         next(error);
//     }
// });

// export default router;
import CustomRouter from '../CustomRouter.js';
import ordersManager from '../../data/mongo/orders.mongo.js';
import usersManager from '../../data/mongo/users.mongo.js';
import { verifytoken } from '../../utils/token.js';

class ViewsThanksRouter extends CustomRouter {
    async renderThanksPage(req, res, next) {
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

            const user = await usersManager.readByEmail(email);
            res.render('thanks', {
                name: 'Thanks!',
                [role]: true // Pass the user role as a dynamic property
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/', ["USER", "PREM"], this.renderThanksPage.bind(this));
    }
}

const viewsThanksRouter = new ViewsThanksRouter();
export default viewsThanksRouter.getRouter();
