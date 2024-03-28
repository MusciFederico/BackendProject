import crypto from 'crypto';

class ProductsMemory {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { products: [], productIdCounter: 1 };
        this.readFromMemory(); // Cargar datos al inicializar la instancia
    }

    async readFromMemory() {
        // In-memory read operation, no asynchronous operation required
        return this.data;
    }

    async saveToMemory() {
        // In-memory write operation, no asynchronous operation required
        return; // You might want to handle any potential errors in a real-world scenario
    }

    create(data) {
        const newProduct = { id: crypto.randomBytes(12).toString('hex'), ...data };
        this.data.products.push(newProduct);
        this.saveToMemory(); // Guardar datos después de agregar un nuevo producto en memoria
        return newProduct;
    }

    read(obj) { //filtros
        // console.log('hola');
        return this.data.products;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        const product = this.data.products.find(product => String(product.id) === stringId);
        if (product) {
            return product;
        } else {
            console.log("El producto con el ID proporcionado no existe.");
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

