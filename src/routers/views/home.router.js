// import express from 'express';
// import path from 'path';
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
//             const token = req.cookies.token;
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

//         // Obtener productos
//         const { filter, sort } = req.query;
//         const filterObj = filter ? JSON.parse(filter) : {};
//         const sortObj = sort ? JSON.parse(sort) : {};
//         const allProducts = await productsManager.read({ filter: filterObj, sort: sortObj });

//         // Renderizar la página de inicio con los productos y el rol del usuario
//         res.render('home', {
//             name: 'Commerce Home',
//             products: allProducts,
//             [role]: true // Pasar el rol del usuario como una propiedad dinámica
//         });
//     } catch (error) {
//         next(error);
//     }
// });


// export default router;
// import express from 'express';
// import path from 'path';
// import productsManager from '../../data/mongo/products.mongo.js';
// import usersManager from '../../data/mongo/users.mongo.js';
// import { verifytoken } from '../../utils/token.js';
// import premiumRead from '../../middlewares/premiumRead.mid.js';

// const router = express.Router();

// router.get('/', premiumRead, async (req, res, next) => {
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
//             email = data.email; // Assuming the token contains email
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

//         const { filter, sort } = req.query;
//         const filterObj = filter ? JSON.parse(filter) : {};
//         const sortObj = sort ? JSON.parse(sort) : {};

//         // Fetch products based on the combined filter
//         const allProducts = await productsManager.read({ filterObj, sortObj });

//         // Render the home page with the products and the user's role
//         res.render('home', {
//             name: 'Commerce Home',
//             products: allProducts,
//             [role]: true // Pass the user's role as a dynamic property
//         });
//     } catch (error) {
//         next(error);
//     }
// });

// export default router;
import CustomRouter from '../CustomRouter.js';
import productsManager from '../../data/mongo/products.mongo.js';
import { verifytoken } from '../../utils/token.js';
import premiumRead from '../../middlewares/premiumRead.mid.js';

class ViewsHomeRouter extends CustomRouter {
    async home(req, res, next) {
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
                email = data.email; // Assuming the token contains email
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

            const { filter, sort } = req.query;
            const filterObj = filter ? JSON.parse(filter) : {};
            const sortObj = sort ? JSON.parse(sort) : {};

            // Fetch products based on the combined filter
            const allProducts = await productsManager.read({ filterObj, sortObj });

            // Render the home page with the products and the user's role
            res.render('home', {
                name: 'Commerce Home',
                products: allProducts,
                [role]: true // Pass the user's role as a dynamic property
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/', ["PUBLIC"], premiumRead, this.home.bind(this));
    }
}

const viewsHomeRouter = new ViewsHomeRouter();
export default viewsHomeRouter.getRouter();