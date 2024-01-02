const fs = require('fs').promises;
const crypto = require('crypto');

class UsersFs {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { users: [], userIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            if (data) {
                this.data = JSON.parse(data);
                console.log('Datos de usuarios cargados exitosamente:', this.data);
            }
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
            console.log('Datos de usuarios guardados correctamente en el archivo.');
        } catch (error) {
            console.error('Error al guardar en el archivo:', error);
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
        return this.data.users.find(user => user.id === id);
    }

    destroy(id) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.data.users.splice(index, 1);
            return this.saveToFile(); // Guardar los cambios al eliminar un usuario
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }
}

module.exports = UsersFs;
