import usersService from '../services/users.services.js';

class UsersController {
    constructor() {
        this.service = usersService;
    }

    create = async (req, res, next) => {
        try {
            const newUser = req.body;
            const createdUser = await this.service.create(newUser);
            res.success201(createdUser)
        } catch (error) {
            next(error);
        }
    }
    read = async (req, res, next) => {
        try {
            const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
            const sortOptions = req.query.sort ? JSON.parse(req.query.sort) : {};

            const allUsers = await this.service.read({ filter: filters, sort: sortOptions });

            res.success200(allUsers);
        } catch (error) {
            next(error);
        }
    }
    readOne = async (req, res, next) => {
        const userId = req.params.uid;
        try {
            const user = await this.service.readOne(userId);
            if (user) {
                return res.success200(user);
            } else {
                const notFoundError = new Error("User not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
    update = async (req, res, next) => {
        const userId = req.params.uid;
        try {
            const data = req.body
            const updatedUser = await this.service.update(userId, data);
            console.log(updatedUser);
            if (updatedUser) {
                return res.success200(updatedUser);

            } else {
                const notFoundError = new Error("User not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
    destroy = async (req, res, next) => {
        const userId = req.params.uid;
        try {
            const deletedUser = await this.service.destroy(userId);
            if (deletedUser) {
                res.success200(deletedUser);
            } else {
                const notFoundError = new Error("User not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
    readByEmail = async (req, res, next) => {
        const userEmail = req.params.email;
        try {
            const user = await this.service.readByEmail(userEmail);
            if (user) {
                res.success200(user);

            } else {
                const notFoundError = new Error("User not found");
                notFoundError.statusCode = 404;
                next(notFoundError);
            }
        } catch (error) {
            next(error);
        }
    }
}

export default UsersController;
const controler = new UsersController();
const { create, read, readOne, update, destroy, readByEmail } = controler
export { create, read, readOne, update, destroy, readByEmail };