import crypto from 'crypto';

class ProductsMemory {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { products: [], productIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            // Simulación de carga desde memoria, no se usa archivo para ProductsMemory
            console.log('Carga de datos de productos en memoria.');
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }

    async saveToFile() {
        try {
            // Simulación de guardado en memoria, no se usa archivo para ProductsMemory
            console.log('Datos de productos guardados en memoria.');
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    }

    create(data) {
        const newProduct = { id: crypto.randomBytes(6).toString('hex'), ...data };
        this.data.products.push(newProduct);
        this.saveToFile(); // Guardar datos después de agregar un nuevo producto en memoria
        return newProduct;
    }

    read() {
        return this.data.products;
    }

    readOne(id) {
        const stringId = String(id); // Convertir el ID proporcionado a string
        return this.data.products.find(product => String(product.id) === stringId);
    }

    destroy(id) {
        const index = this.data.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.data.products.splice(index, 1);
            return this.saveToFile(); // Guardar los cambios al eliminar un producto en memoria
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }

    update(id, data) {
        const index = this.data.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.data.products[index] = { ...this.data.products[index], ...data };
            this.saveToFile(); // Guardar los cambios al actualizar un producto en memoria
            return this.data.products[index];
        }
        return false; // Indica que no se encontró el producto con el ID dado
    }
}

export default ProductsMemory;
