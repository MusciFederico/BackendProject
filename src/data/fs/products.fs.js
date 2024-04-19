import { promises } from 'fs';
import crypto from 'crypto';
import logger from '../../utils/logger/logger.factory.js';

class ProductsFs {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { products: [], productIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            const data = await promises.readFile(this.filePath, 'utf8');
            if (data) {
                this.data = JSON.parse(data);
            }
        } catch (error) {
            logger.WARN('Error al cargar el archivo:', error);
        }
    }

    async saveToFile() {
        try {
            await promises.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            logger.WARN('Error al guardar en el archivo:', error);
        }
    }

    create(data) {
        const newProduct = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.products.push(newProduct);
        this.saveToFile(); // Guardar datos después de agregar un nuevo producto
        return newProduct;
    }

    read(obj) {
        //hacer algo con obj
        return this.data.products;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        return this.data.products.find(product => String(product.id) === stringId);
    }

    destroy(id) {
        const index = this.data.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.data.products[index];
            this.data.products.splice(index, 1);
            this.saveToFile();
            return deletedProduct;
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }

    update(id, data) {
        const index = this.data.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.data.products[index] = { ...this.data.products[index], ...data };
            this.saveToFile(); // Guardar los cambios al actualizar un producto
            return this.data.products[index];
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }
}

const productsFs = new ProductsFs('./src/data/fs/files/products.json');
export default productsFs;
