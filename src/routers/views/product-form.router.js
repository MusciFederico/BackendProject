// import express from 'express';
// import path from 'path';
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

//         // Renderizar el formulario de productos con el nombre y el rol del usuario
//         res.render('product-form', {
//             name: 'Product Form',
//             [role]: true
//         });
//     } catch (error) {
//         next(error);
//     }
// });

// export default router;
import CustomRouter from '../CustomRouter.js';
import { verifytoken } from '../../utils/token.js';

class ViewsProductFormRouter extends CustomRouter {
    async renderProductForm(req, res, next) {
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

            // Render the product form with the user's name and role
            res.render('product-form', {
                name: 'Product Form',
                [role]: true
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/', ["ADMIN", "PREM"], this.renderProductForm.bind(this));
    }
}

const viewsProductFormRouter = new ViewsProductFormRouter();
export default viewsProductFormRouter.getRouter();