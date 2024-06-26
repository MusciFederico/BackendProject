
import CustomRouter from '../CustomRouter.js';
import usersManager from '../../data/mongo/users.mongo.js';
import { verifytoken } from '../../utils/token.js';

class ViewsProfileRouter extends CustomRouter {
    async renderProfilePage(req, res, next) {
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

            const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleString(); // Adjust formatting as needed
            };

            const user = await usersManager.readByEmail(email);
            let userHBS = { ...user };
            userHBS.name = user.name;
            userHBS.email = user.email;
            userHBS.photo = user.photo;
            userHBS.age = user.age;
            userHBS.verified = user.verified;
            if (user.createdAt) {
                userHBS.createdAt = formatDate(user.createdAt);
            }
            if (user.updatedAt) {
                userHBS.updatedAt = formatDate(user.updatedAt);
            }

            res.render('profile', {
                name: 'Your Profile',
                profile: userHBS,
                [role]: true // Pass the user role as a dynamic property
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/', ["USER", "PREM", "ADMIN"], this.renderProfilePage.bind(this));
    }
}

const viewsProfileRouter = new ViewsProfileRouter();
export default viewsProfileRouter.getRouter();
