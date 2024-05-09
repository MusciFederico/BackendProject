import crypto from 'crypto';
import logger from '../../utils/logger/logger.factory.js';


class OrdersMemory {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { orders: [], orderIdCounter: 1 };
        this.readFromMemory(); // Cargar datos al inicializar la instancia
    }

    async readFromMemory() {
        return this.data;
    }

    async saveToMemory() {
        return;
    }


    create(data) {
        const newOrder = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.orders.push(newOrder);
        this.saveToMemory(); // Guardar datos después de agregar una nueva orden en memoria
        return newOrder;
    }

    read(obj) {
        return this.data.orders;
    }

    readOne(id) {
        const order = this.data.orders.filter(order => order.id === id);
        if (product) {
            return order;
        } else {
            logger.WARN("El producto con el ID proporcionado no existe.");
            return null; // O puedes manejar el caso según lo necesites
        }
    }

    update(id, data) {
        const index = this.data.orders.findIndex(order => order.id === id);
        if (index !== -1) {
            this.data.orders[index] = { ...this.data.orders[index], ...data };
            this.saveToMemory(); // Guardar los cambios al actualizar un producto en memoria
            this.data.orders[index];
            return this.data.orders[index]; // Return the updated product
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }

    destroy(id) {
        const index = this.data.orders.findIndex(order => order.id === id);
        if (index !== -1) {
            const deletedOrder = this.data.orders[index];
            this.data.orders.splice(index, 1);
            this.saveToMemory(); // Guardar los cambios al eliminar una orden en memoria
            return deletedOrder;
        }
        return false; // Indica que no se encontró la orden con el ID dado
    }
}

const ordersMemory = new OrdersMemory
export default ordersMemory;


