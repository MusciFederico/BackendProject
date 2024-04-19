import crypto from 'crypto';
import logger from '../../utils/logger/logger.factory.js';

class ProductsMemory {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { products: [], productIdCounter: 1 };
        this.readFromMemory(); // Cargar datos al inicializar la instancia
    }

    async readFromMemory() {
        return this.data;
    }

    async saveToMemory() {
        return;
    }

    create(data) {
        const newProduct = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.products.push(newProduct);
        this.saveToMemory(); // Guardar datos después de agregar un nuevo producto en memoria
        return newProduct;
    }

    read(obj) { //filtros
        return this.data.products;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        const product = this.data.products.find(product => String(product.id) === stringId);
        if (product) {
            return product;
        } else {
            logger.WARN("El producto con el ID proporcionado no existe.");
            return null; // O puedes manejar el caso según lo necesites
        }
    }

    destroy(id) {
        const index = this.data.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.data.products[index];
            this.data.products.splice(index, 1);
            this.saveToMemory();
            return deletedProduct;
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }

    update(id, data) {
        const index = this.data.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.data.products[index] = { ...this.data.products[index], ...data };
            this.saveToMemory(); // Guardar los cambios al actualizar un producto en memoria
            this.data.products[index];
            return this.data.products[index]; // Return the updated product
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }
}

const productsMemory = new ProductsMemory
export default productsMemory;

