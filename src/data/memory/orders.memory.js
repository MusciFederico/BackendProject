import crypto from 'crypto';

class OrdersMemory {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { orders: [], orderIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            // Simulación de carga desde memoria, no se usa archivo para OrdersMemory
            // console.log('Carga de datos de órdenes en memoria.');
        } catch (error) {
            // console.error('Error al cargar los datos:', error);
        }
    }

    async saveToFile() {
        try {
            // Simulación de guardado en memoria, no se usa archivo para OrdersMemory
            // console.log('Datos de órdenes guardados en memoria.');
        } catch (error) {
            // console.error('Error al guardar los datos:', error);
        }
    }

    create(data) {
        const newOrder = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.orders.push(newOrder);
        this.saveToFile(); // Guardar datos después de agregar una nueva orden en memoria
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
            console.log("El producto con el ID proporcionado no existe.");
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
            this.saveToFile(); // Guardar los cambios al eliminar una orden en memoria
            return deletedOrder;
        }
        return false; // Indica que no se encontró la orden con el ID dado
    }
}

const ordersMemory = new OrdersMemory
export default ordersMemory;


