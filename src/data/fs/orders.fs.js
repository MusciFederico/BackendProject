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
                // console.log('Datos de productos cargados exitosamente:', this.data);
            }
        } catch (error) {
            console.error('Error al cargar el archivo:', error);
        }
    }

    async saveToFile() {
        try {
            await promises.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
            // console.log('Datos de productos guardados correctamente en el archivo.');
        } catch (error) {
            console.error('Error al guardar en el archivo:', error);
        }
    }

    create(data) {
        const newOrder = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.orders.push(newOrder);
        this.saveToFile(); // Guardar datos después de agregar un nuevo producto
        return newOrder;
    }

    read(obj) {
        //hacer algo con obj
        return this.data.orders;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        return this.data.orders.find(product => String(product.id) === stringId);
    }

    update(id, data) {
        const index = this.data.orders.findIndex(order => order.id === id);
        if (index !== -1) {
            this.data.orders[index] = { ...this.data.orders[index], ...data };
            this.saveToFile(); // Guardar los cambios al actualizar un producto
            return this.data.orders[index];
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }

    destroy(id) {
        const index = this.data.orders.findIndex(order => order.id === id);
        if (index !== -1) {
            const deletedProduct = this.data.orders[index];
            this.data.orders.splice(index, 1);
            this.saveToFile();
            return deletedProduct;
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }
}

const ordersFs = new OrdersFs('./src/data/fs/files/orders.json');
export default ordersFs;

