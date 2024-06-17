
import CustomRouter from '../CustomRouter.js';
import { verifytoken } from '../../utils/token.js';
import isAuthMid from '../../middlewares/isAuth.mid.js';

class ViewsLoginRouter extends CustomRouter {
    async login(req, res, next) {
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

            res.render('login', {
                title: 'Login Form',
                [role]: true
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/', ["PUBLIC"], isAuthMid, this.login.bind(this));
    }
}

const viewsLoginRouter = new ViewsLoginRouter();
export default viewsLoginRouter.getRouter();
