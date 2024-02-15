import { promises } from 'fs';
import crypto from 'crypto';

class OrdersFs {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { orders: [], orderIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            const data = await promises.readFile(this.filePath, 'utf8');
            if (data) {
                this.data = JSON.parse(data);
                console.log('Datos de órdenes cargados exitosamente:', this.data);
            }
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
        }
    }

    async saveToFile() {
        try {
            await promises.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
            console.log('Datos de órdenes guardados correctamente en el archivo.');
        } catch (error) {
            console.error('Error al guardar en el archivo:', error);
        }
    }

    create(data) {
        const newOrder = {
            oid: crypto.randomBytes(6).toString('hex'),
            pid: data.pid,
            uid: data.uid,
            quantity: data.quantity,
            state: data.state
        };
        this.data.orders.push(newOrder);
        this.saveToFile(); // Guardar datos después de agregar una nueva orden
        return newOrder;
    }

    read() {
        return this.data.orders;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        return this.data.orders.find(order => String(order.oid) === stringId);
    }

    update(oid, quantity, state) {
        const orderToUpdate = this.data.orders.find(order => order.oid === oid);
        if (orderToUpdate) {
            if (quantity !== undefined) {
                orderToUpdate.quantity = quantity;
            }
            if (state !== undefined) {
                orderToUpdate.state = state;
            }
            this.saveToFile(); // Guardar los cambios al actualizar una orden
            return orderToUpdate;
        }
        return false; // Indica que no se encontró la orden con el ID dado
    }

    destroy(oid) {
        const index = this.data.orders.findIndex(order => order.oid === oid);
        if (index !== -1) {
            this.data.orders.splice(index, 1);
            this.saveToFile(); // Guardar los cambios al eliminar una orden
            return true;
        }
        return false; // Indica que no se encontró la orden con el ID dado
    }
}

export default OrdersFs;
