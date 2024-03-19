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
        const newOrder = {
            id: crypto.randomBytes(6).toString('hex'),
            pid: data.pid,
            uid: data.uid,
            quantity: data.quantity,
            state: data.state
        };
        this.data.orders.push(newOrder);
        this.saveToFile(); // Guardar datos después de agregar una nueva orden en memoria
        return newOrder;
    }

    read() {
        return this.data.orders;
    }

    readByUser(uid) {
        return this.data.orders.filter(order => order.uid === uid);
    }

    update(oid, quantity, state) {
        const orderToUpdate = this.data.orders.find(order => order.id === oid);
        if (orderToUpdate) {
            if (quantity !== undefined) {
                orderToUpdate.quantity = quantity;
            }
            if (state !== undefined) {
                orderToUpdate.state = state;
            }
            this.saveToFile(); // Guardar los cambios al actualizar una orden en memoria
            return orderToUpdate;
        }
        return false; // Indica que no se encontró la orden con el ID dado
    }

    destroy(oid) {
        const index = this.data.orders.findIndex(order => order.id === oid);
        if (index !== -1) {
            this.data.orders.splice(index, 1);
            this.saveToFile(); // Guardar los cambios al eliminar una orden en memoria
            return true;
        }
        return false; // Indica que no se encontró la orden con el ID dado
    }
}

export default OrdersMemory;
