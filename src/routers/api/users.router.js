import CustomRouter from '../Customrouter.js';
import path from 'path';
import { create, read, readOne, update, destroy, readByEmail } from '../../controllers/users.controller.js'
import passport from "../../middlewares/passport.mid.js"

// import UsersFs from '../../data/fs/users.fs.js';
// const usersManager = new UsersFs('./src/data/fs/files/users.json');
class UsersRouter extends CustomRouter {
    init() {
        this.read('/', ["ADMIN"], read);

        this.create('/', ["PUBLIC"], passport.authenticate("jwt", { session: false }), create);

        this.read('/:uid', ["USER", "PREMIUM"], readOne);

        this.update('/:uid', ["USER", "PREMIUM"], update); //problemas con error forbiden

        this.destroy('/:uid', ["USER", "PREMIUM"], destroy);

        this.read('/email/:email', ["ADMIN"], readByEmail);
    }
};

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();