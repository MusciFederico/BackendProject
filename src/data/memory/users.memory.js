import crypto from 'crypto';

class UsersMemory {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { users: [], userIdCounter: 1 };
        this.readFromMemory(); // Cargar datos al inicializar la instancia
    }

    async readFromMemory() {
        return this.data;
    }

    async saveToMemory() {
        return;
    }

    create(data) {
        const newUser = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.users.push(newUser);
        this.saveToMemory(); // Guardar datos después de agregar un nuevo usuario en memoria
        return newUser;
    }

    read() {
        return this.data.users;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        return this.data.orders.find(order => String(order.oid) === stringId);
    } //chekear

    destroy(id) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.data.users.splice(index, 1);
            return this.saveToMemory(); // Guardar los cambios al eliminar un usuario en memoria
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }

    update(id, data) {
        const index = this.data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.data.users[index] = { ...this.data.users[index], ...data };
            this.saveToMemory(); // Guardar los cambios al actualizar un usuario en memoria
            return this.data.users[index];
        }
        return false; // Indica que no se encontró el usuario con el ID dado
    }
}
const usersMemory = new UsersMemory()
export default usersMemory;
