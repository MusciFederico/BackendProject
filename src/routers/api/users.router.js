import CustomRouter from '../CustomRouter.js';
import authorizeRoles from '../../middlewares/authorize.mid.js';
import { create, read, readOne, update, destroy, readByEmail } from '../../controllers/users.controller.js'


class UsersRouter extends CustomRouter {
    init() {
        this.read('/', ["ADMIN"], read);

        this.create('/', ["ADMIN"], create);

        this.read('/:uid', ["ADMIN", "PREM", "USER"], authorizeRoles({ idSource: 'params' }), readOne);

        this.update('/:uid', ["ADMIN", "PREM", "USER"], authorizeRoles({ idSource: 'params' }), update);

        this.destroy('/:uid', ["ADMIN", "PREM", "USER"], authorizeRoles({ idSource: 'params' }), destroy);

        this.read('/email/:email', ["ADMIN", "PREM", "USER"], authorizeRoles({ idParam: 'email', idSource: 'params' }), readByEmail);
    }
};

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();