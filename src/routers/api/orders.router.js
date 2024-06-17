import CustomRouter from '../CustomRouter.js';
import { report, create, read, readOne, update, destroy, readOrdersById } from '../../controllers/orders.controller.js'
import authorizeRoles from '../../middlewares/authorize.mid.js';

class OrdersRouter extends CustomRouter {
    init() {
        this.read('/', ["ADMIN"], read);

        this.create('/', ["USER", "PREM"], authorizeRoles({ idParam: 'user_id', idSource: 'body' }), create);

        this.read('/:oid', ["USER", "PREM"], authorizeRoles({ idParam: 'oid', idSource: 'params', checkOrder: true }), readOne);

        this.update('/:oid', ["USER", "PREM"], authorizeRoles({ idParam: 'oid', idSource: 'params', checkOrder: true }), update);

        this.destroy('/:oid', ["USER", "PREM"], authorizeRoles({ idParam: 'oid', idSource: 'params', checkOrder: true }), destroy);

        this.read('/total/:uid', ["USER", "PREM"], authorizeRoles({ idSource: 'params' }), report);

        this.read('/cart/:uid', ["USER", "PREM"], authorizeRoles({ idSource: 'params' }), readOrdersById);
    }
};

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
