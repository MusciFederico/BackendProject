import CustomRouter from '../CustomRouter.js';
import path from 'path';
import { create, read, readOne, update, destroy } from '../../controllers/products.controller.js'

// import ProductsFs from '../../data/fs/products.fs.js';
// const productsManager = new ProductsFs('./src/data/fs/files/products.json');


class ProductsRouter extends CustomRouter {
    init() {
        this.read('/', ["PUBLIC"], read);

        this.create('/', ["ADMIN", "PREMIUM"], create);

        this.read('/:pid', ["PUBLIC"], readOne);

        this.update('/:pid', ["ADMIN", "PREMIUM"], update); //problemas con error forbiden

        this.destroy('/:pid', ["ADMIN", "PREMIUM"], destroy);
    }
};

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();