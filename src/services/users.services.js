import { usersManager } from '../data/mongo/manager.mongo.js'

class UsersService {
    constructor() {
        this.model = usersManager
    };
    create = async (data) => {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }
    read = async ({ filters, sortOptions }) => {
        try {
            const response = await this.model.read({ filter: filters, sort: sortOptions });
            return response
        } catch (error) {
            throw error;
        }
    }
    readOne = async (userId) => {
        try {
            const response = await this.model.readOne(userId);
            return response
        } catch (error) {
            throw error;
        }
    }
    update = async (pid, data) => {
        try {
            const response = await this.model.update(pid, data);
            return response
        } catch (error) {
            throw error;
        }
    }
    destroy = async (userId) => {
        try {
            const response = await this.model.destroy(userId);
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