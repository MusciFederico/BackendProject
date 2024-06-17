import CustomRouter from '../CustomRouter.js';
import { create, read, readOne, update, destroy, readMe } from '../../controllers/products.controller.js'
import premiumRead from '../../middlewares/premiumRead.mid.js';
import authorizeRoles from '../../middlewares/authorize.mid.js';



class ProductsRouter extends CustomRouter {
    init() {
        this.read('/', ["PUBLIC"], premiumRead, read);

        this.read('/me', ["PREM"], readMe);

        this.create('/', ["ADMIN", "PREM"], create);

        this.read('/:pid', ["PUBLIC"], readOne);

        this.update('/:pid', ["ADMIN", "PREM"], authorizeRoles({ idParam: 'pid', idSource: 'params', checkProduct: true }), update);

        this.destroy('/:pid', ["ADMIN", "PREM"], authorizeRoles({ idParam: 'pid', idSource: 'params', checkProduct: true }), destroy);
    }
};

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();