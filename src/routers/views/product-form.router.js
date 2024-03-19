// import express from 'express';
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.render('product-form', { name: 'Product Form' });
// });

// export default router;
import express from 'express';
import path from 'path';
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

        // Renderizar el formulario de productos con el nombre y el rol del usuario
        res.render('product-form', {
            name: 'Product Form',
            [role]: true
        });
    } catch (error) {
        next(error);
    }
});

export default router;
