import crypto from 'crypto';

class UsersMemory {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { users: [], userIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            // Simulación de carga desde memoria, no se usa archivo para UsersMemory
            // console.log('Carga de datos de usuarios en memoria.');
        } catch (error) {
            // console.error('Error al cargar los datos:', error);
        }
    }

    async saveToFile() {
        try {
            // Simulación de guardado en memoria, no se usa archivo para UsersMemory
            // console.log('Datos de usuarios guardados en memoria.');
        } catch (error) {
            // console.error('Error al guardar los datos:', error);
        }
    }

    create(data) {
        const newUser = { id: crypto.randomBytes(6).toString('hex'), ...data };
        this.data.users.push(newUser);
        this.saveToFile(); // Guardar datos después de agregar un nuevo usuario en memoria
        return newUser;
    }

    read() {
        return this.data.users;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        return this.data.orders.find(order => String(order.oid) === stringId);
    }

    destroy(id) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.data.users.splice(index, 1);
            return this.saveToFile(); // Guardar los cambios al eliminar un usuario en memoria
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }

    update(id, data) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.data.users[index] = { ...this.data.users[index], ...data };
            this.saveToFile(); // Guardar los cambios al actualizar un usuario en memoria
            return this.data.users[index];
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }
}

export default UsersMemory;
