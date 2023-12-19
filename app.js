const fs = require('fs').promises;

class DataManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = { products: [], users: [], productIdCounter: 1, userIdCounter: 1 };
        this.loadFromFile(); // Cargar datos al inicializar la instancia
    }

    async loadFromFile() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            if (data) {
                this.data = JSON.parse(data);
            }
        } catch (error) {
            // Si el archivo no existe o hay un error al leerlo, se maneja aquí
            console.error('Error al cargar el archivo:', error);
        }
    }

    async saveToFile() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2));
            console.log('Datos guardados correctamente en el archivo.');
        } catch (error) {
            console.error('Error al guardar en el archivo:', error);
        }
    }

    async createProduct(data) {
        const newProduct = { id: this.data.productIdCounter++, ...data };
        this.data.products.push(newProduct);
        await this.saveToFile(); // Guardar datos después de agregar un nuevo producto
        return newProduct;
    }

    async createUser(data) {
        const newUser = { id: this.data.userIdCounter++, ...data };
        this.data.users.push(newUser);
        await this.saveToFile(); // Guardar datos después de agregar un nuevo usuario
        return newUser;
    }

    getAllProducts() {
        return this.data.products;
    }

    getProductById(id) {
        return this.data.products.find(product => product.id === id);
    }

    getAllUsers() {
        return this.data.users;
    }

    getUserById(id) {
        return this.data.users.find(user => user.id === id);
    }
}

// Ejemplo de uso
const dataManager = new DataManager('data.json');

// Crear productos y usuarios
dataManager.createProduct({
    title: 'Producto 1',
    photo: 'ruta/imagen1.jpg',
    price: 20.99,
    stock: 50,
});

dataManager.createUser({
    name: 'Usuario 1',
    photo: 'ruta/imagen_user1.jpg',
    email: 'usuario1@example.com',
});

// Obtener todos los productos y usuarios
const allProducts = dataManager.getAllProducts();
const allUsers = dataManager.getAllUsers();

// Obtener un producto y un usuario por su ID
const productById = dataManager.getProductById(1);
const userById = dataManager.getUserById(1);

console.log(allProducts);
console.log(allUsers);
console.log(productById);
console.log(userById);
