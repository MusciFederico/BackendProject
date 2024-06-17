import usersManager from '../data/mongo/users.mongo.js'; //cuestionable
import usersRep from '../repositories/users.rep.js';
import sendEmail from '../utils/sendEmail.js';

class UsersService {
    constructor() {
        this.usersRep = usersRep
    };
    create = async (data) => {
        try {
            const response = await this.usersRep.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    read = async ({ filters, sortOptions }) => {
        try {
            const response = await this.usersRep.read({ filter: filters, sort: sortOptions });
            return response
        } catch (error) {
            throw error;
        }
    }
    readOne = async (id) => {
        try {
            const response = await this.usersRep.readOne(id);
            return response
        } catch (error) {
            throw error;
        }
    }
    update = async (id, data) => {
        try {
            const response = await this.usersRep.update(id, data);
            return response
        } catch (error) {
            throw error;
        }
    }
    destroy = async (id) => {
        try {
            const response = await this.usersRep.destroy(id);
            return response
        } catch (error) {
            throw error;
        }
    }

    readByEmail = async (userEmail) => {
        try {
            const response = await usersManager.readByEmail(userEmail);
            return response
        } catch (error) {
            throw error;
        }
    }
}

const usersService = new UsersService();
export default usersService;
