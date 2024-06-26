
import CustomRouter from '../CustomRouter.js';
import isAuthMid from '../../middlewares/isAuth.mid.js';

class ViewsRegistrationRouter extends CustomRouter {
    async renderRegistrationForm(req, res, next) {
        try {
            res.render('registration', {
                title: 'Registration Form',
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/', ["PUBLIC"], isAuthMid, this.renderRegistrationForm.bind(this));
    }
}

const viewsRegistrationRouter = new ViewsRegistrationRouter();
export default viewsRegistrationRouter.getRouter();