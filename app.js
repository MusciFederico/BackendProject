class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    create(data) {
        const { title, photo, price, stock } = data;
        const newProduct = {
            id: this.productIdCounter++,
            title,
            photo,
            price,
            stock,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    read() {
        return this.products;
    }

    readOne(id) {
        return this.products.find((product) => product.id === id);
    }
}

class UserManager {
    constructor() {
        this.users = [];
        this.userIdCounter = 1;
    }

    create(data) {
        const { name, photo, email } = data;
        const newUser = {
            id: this.userIdCounter++,
            name,
            photo,
            email,
        };
        this.users.push(newUser);
        return newUser;
    }

    read() {
        return this.users;
    }

    readOne(id) {
        return this.users.find((user) => user.id === id);
    }
}

// Ejemplo de uso
const productManager = new ProductManager();
const userManager = new UserManager();

// Crear productos y usuarios
productManager.create({
    title: "Producto 1",
    photo: "ruta/imagen1.jpg",
    price: 20.99,
    stock: 50,
});

userManager.create({
    name: "Usuario 1",
    photo: "ruta/imagen_user1.jpg",
    email: "usuario1@example.com",
});

// Obtener todos los productos y usuarios
const allProducts = productManager.read();
const allUsers = userManager.read();

// Obtener un producto y un usuario por su ID
const productById = productManager.readOne(1);
const userById = userManager.readOne(1);

console.log(allProducts);
console.log(allUsers);
console.log(productById);
console.log(userById);
