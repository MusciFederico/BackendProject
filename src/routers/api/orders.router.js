import CustomRouter from '../Customrouter.js';
import path from 'path';
import { create, read, readOne, update, destroy } from '../../controllers/users.controller.js'
import passport from "../../middlewares/passport.mid.js"

class OrdersRouter extends CustomRouter {
    init() {
        this.read('/', ["USER", "PREMIUM"], read);

        this.create('/', ["USER", "PREMIUM"], passport.authenticate("jwt", { session: false }), create);

        this.read('/:oid', ["PUBLIC"], readOne);

        this.update('/:oid', ["USER", "PREMIUM"], update); //problemas con error forbiden

        this.destroy('/:oid', ["USER", "PREMIUM"], destroy);

        this.read('/total/:uid', ["ADMIN"], read);

    }
};

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
