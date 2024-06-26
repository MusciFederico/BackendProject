import args from "../utils/args.js";
import logger from "../utils/logger/logger.factory.js";

let dao = {}

const environment = args.env || "test";

switch (environment) {
    case "dev":
        logger.INFO("MEMORY CONNECTED");
        const { default: productsMemory } = await import("./memory/products.memory.js");
        const { default: usersMemory } = await import("./memory/users.memory.js");
        const { default: ordersMemory } = await import("./memory/orders.memory.js");
        dao = {
            products: productsMemory,
            users: usersMemory,
            orders: ordersMemory
        }
        break;
    case "prod":
        logger.INFO("FS CONNECTED");
        const { default: productsFs } = await import("./fs/products.fs.js");
        const { default: usersFs } = await import("./fs/users.fs.js");
        const { default: ordersFs } = await import("./fs/orders.fs.js");

        dao = {
            products: productsFs,
            users: usersFs,
            orders: ordersFs
        }

        break;
    case "test":
    default:
        logger.INFO("MONGO CONNECTED");
        const { default: productsMongo } = await import("./mongo/products.mongo.js");
        const { default: usersMongo } = await import("./mongo/users.mongo.js");
        const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
        dao = { products: productsMongo, users: usersMongo, orders: ordersMongo };
        break;
}

export default dao;


