import { promises } from 'fs';
import crypto from 'crypto';

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
                console.log('Datos de usuarios cargados exitosamente:', this.data);
            } else {
                console.log('El archivo de usuarios está vacío.');
            }
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
        }
    }

    create(data) {
        const newUser = { id: crypto.randomBytes(6).toString('hex'), ...data };
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
            this.data.users.splice(index, 1);
            return this.saveToFile(); // Guardar los cambios al eliminar un usuario
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }

    update(id, data) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.data.users[index] = { ...this.data.users[index], ...data };
            this.saveToFile(); // Guardar los cambios al actualizar un usuario
            return this.data.users[index];
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }
}

export default UsersFs;
