import CustomRouter from '../CustomRouter.js';
import productsManager from '../../data/mongo/products.mongo.js';
import usersManager from '../../data/mongo/users.mongo.js';
import { verifytoken } from '../../utils/token.js';

class ViewsDetailsRouter extends CustomRouter {
    async home(req, res, next) {
        const role0 = 'role0';
        const role1 = 'role1';
        const role2 = 'role2';
        const roleUnd = 'roleUnd';

        const productModifyingTrue = 'productModifyingTrue';
        const productModifyingFalse = 'productModifyingFalse';

        try {
            let owner
            let role;
            let email;
            let user
            let id
            let productModifying
            if (req.cookies.token) {
                const token = req.cookies.token;
                const data = verifytoken(token);
                role = data.role;
                email = data.email; // Assuming the token contains email
                user = await usersManager.readByEmail(email);
                id = user._id.toString();
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
            const { pid } = req.params;
            const cart = await productsManager.readOne(pid); // Adjust this based on your carts manager method
            if (!cart) {
                return res.status(404).send('Cart not found');
            }
            if (cart.owner) {
                owner = cart.owner.toString()
            }
            if (role1 || (id = owner)) {
                productModifying = productModifyingTrue
            }
            if (id === owner) {
                productModifying = productModifyingTrue
            }
            else {
                productModifying = productModifyingFalse
            }
            // Render the home page with the cart details and the user's role
            res.render('details', {
                name: 'Commerce Home',
                cart: cart, // Pass the cart data to the template
                user: user,
                [productModifying]: true,
                [role]: true // Pass the user's role as a dynamic property
            });
        } catch (error) {
            next(error);
        }
    }

    init() {
        this.read('/:pid', ["PUBLIC"], this.home.bind(this));
    }
}

const viewsDetailsRouter = new ViewsDetailsRouter();
export default viewsDetailsRouter.getRouter();
