// import express from 'express';
// import path from 'path';

// // import ProductsFs from '../../data/fs/products.fs.js';
// // const productsManager = new ProductsFs('./src/data/fs/files/products.json');

// import { productsManager } from '../../data/mongo/manager.mongo.js';

// const router = express.Router();

// // Ruta para servir la página de inicio
// router.get('/', async (req, res, next) => {
//     try {
//         const allProducts = await productsManager.read();
//         console.log("estos son los productos", allProducts);
//         res.render('home', { name: 'Commerce Home', products: allProducts });
//     } catch (error) {
//         next(error);
//     }
// });

// export default router;

import express from 'express';
import path from 'path';
import { productsManager } from '../../data/mongo/manager.mongo.js';
import { verifytoken } from '../../utils/token.js';

const router = express.Router();

router.get('/', async (req, res, next) => {

    const role0 = 'role0';
    const role1 = 'role1';
    const roleUnd = 'roleUnd';

    try {
        let role;
        if (req.session.role === 0) {
            role = role0;
        } else if (req.session.role === 1) {
            role = role1;
        } else {
            role = roleUnd;
        }

        // Obtener productos
        const { filter, sort } = req.query;
        const filterObj = filter ? JSON.parse(filter) : {};
        const sortObj = sort ? JSON.parse(sort) : {};
        const allProducts = await productsManager.read({ filter: filterObj, sort: sortObj });

        // Renderizar la página de inicio con los productos y el rol del usuario
        res.render('home', {
            name: 'Commerce Home',
            products: allProducts,
            [role]: true // Pasar el rol del usuario como una propiedad dinámica
        });
    } catch (error) {
        next(error);
    }
});


export default router;
