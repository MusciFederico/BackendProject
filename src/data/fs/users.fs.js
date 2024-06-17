import { promises } from 'fs';
import crypto from 'crypto';
import logger from '../../utils/logger/logger.factory.js';

class UsersFs {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { users: [], userIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            const fileContent = await promises.readFile(this.filePath, 'utf8');
            if (fileContent.trim() !== '') {
                this.data = JSON.parse(fileContent);
            } else {
            }
        } catch (error) {
            logger.WARN('Error al cargar el archivo:', error);
        }
    }

    async saveToFile() {
        try {
            await promises.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            logger.WARN('Error al guardar en el archivo:', error);
        }
    }

    create(data) {
        const newUser = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.users.push(newUser);
        this.saveToFile(); // Guardar datos después de agregar un nuevo usuario
        return newUser;
    }

    read() {
        return this.data.users;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        return this.data.users.find(user => String(user.id) === stringId);
    }

    destroy(id) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedProduct = this.data.users.splice(index, 1);
            this.saveToFile();
            return deletedProduct
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }

    update(id, data) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            const updatedUser = this.data.users[index] = { ...this.data.users[index], ...data };
            this.saveToFile(); // Guardar los cambios al actualizar un usuario
            return updatedUser
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }
}

const usersFs = new UsersFs('./src/data/fs/files/users.json');
export default usersFs;


