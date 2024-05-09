import CustomRouter from '../CustomRouter.js';
import path from 'path';
import { report, create, read, readOne, update, destroy } from '../../controllers/orders.controller.js'

class OrdersRouter extends CustomRouter {
    init() {
        this.read('/', ["USER", "PREMIUM"], read);

        this.create('/', ["USER", "PREMIUM"], create);

        this.read('/:oid', ["PUBLIC"], readOne);

        this.update('/:oid', ["USER", "PREMIUM"], update); //problemas con error forbiden

        this.destroy('/:oid', ["USER", "PREMIUM"], destroy);

        this.read('/total/:uid', ["ADMIN"], report);

    }
};

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
