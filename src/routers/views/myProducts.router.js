import CustomRouter from '../CustomRouter.js';
import productsManager from '../../data/mongo/products.mongo.js';
import usersManager from '../../data/mongo/users.mongo.js';
import { verifytoken } from '../../utils/token.js';
import premiumRead from '../../middlewares/premiumRead.mid.js';

class ViewsHomeRouter extends CustomRouter {
    async home(req, res, next) {
        const role0 = 'role0';
        const role1 = 'role1';
        const role2 = 'role2';
        const roleUnd = 'roleUnd';

        try {
            let role;
            let email;
            let userId
            if (req.cookies.token) {
                const token = req.cookies.token;
                const data = verifytoken(token);
                role = data.role;
                email = data.email;
                const user = await usersManager.readByEmail(email)
                userId = user._id
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
            const { filter, sort } = req.query;
            const sortObj = sort ? JSON.parse(sort) : {};
            const paramsFilter = filter ? JSON.parse(filter) : {};
            const userFilter = { owner: userId };
            const filterObj = { ...userFilter, ...paramsFilter }
            // Fetch products based on the combined filter
            const allProducts = await productsManager.read({ filterObj, sortObj });
            // console.log("allProducts", allProducts);

            // Render the home page with the products and the user's role
            res.render('myProducts', {
                name: 'Commerce Home',
                products: allProducts,
                [role]: true // Pass the user's role as a dynamic property
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/me', ["PREM"], this.home.bind(this));
    }
}

const viewsHomeRouter = new ViewsHomeRouter();
export default viewsHomeRouter.getRouter();