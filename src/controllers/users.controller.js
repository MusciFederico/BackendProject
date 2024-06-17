import usersService from '../services/users.services.js';
import CustomError from '../utils/customError.js';
import errors from '../utils/errorLibrary.js';

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
                CustomError.new(errors.notFound)
            }
        } catch (error) {
            next(error);
        }
    }
    update = async (req, res, next) => {
        const userId = req.params.uid;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        try {
            const data = req.body
            if (data.name === null || data.last_name === null || data.email === null ||
                data.password === null || data.photo === null || data.age === null || data.role === null ||
                data.name === "" || data.last_name === "" || data.email === "" ||
                data.password === "" || data.photo === "" || data.age === "" || data.photo === "") {
                CustomError.new(errors.error);
            }
            if (data.email !== undefined && !emailRegex.test(data.email)) {
                new CustomError(errors.emailRegex);
            }
            if (data.password !== undefined && data.password.length < 8) {
                new CustomError(errors.password);
            }
            const updatedUser = await this.service.update(userId, data);
            if (updatedUser) {
                return res.success200(updatedUser);

            } else {
                CustomError.new(errors.notFound)
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
                CustomError.new(errors.notFound)
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
                CustomError.new(errors.notFound)
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
