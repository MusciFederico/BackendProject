// import args from "../utils/args.js";

// let dao = {}

// const enviroment = args.env

// switch (enviroment) {
//     case "dev":
//         console.log("MEMORY CONECTED");
//         const { default: productsMemory } = await import("./memory/products.memory.js");
//         const { default: usersMemory } = await import("./memory/users.memory.js");
//         const { default: ordersMemory } = await import("./memory/orders.memory.js");
//         dao = {
//             products: productsMemory,
//             users: usersMemory,
//             orders: ordersMemory
//         }
//         break;
//     case "prod":
//         console.log("FS CONECTED");
//         const { default: productsFs } = await import("./fs/products.fs.js");
//         const { default: usersFs } = await import("./fs/users.fs.js");
//         const { default: ordersFs } = await import("./fs/orders.fs.js");

//         dao = {
//             products: productsFs,
//             users: usersFs,
//             orders: ordersFs
//         }

//         break;
//     case "test":
//         console.log("MONGO CONECTED");
//         const { default: productsMongo } = await import("./mongo/products.mongo.js");
//         const { default: usersMongo } = await import("./mongo/users.mongo.js");
//         const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
//         dao = {
//             products: productsMongo,
//             users: usersMongo,
//             orders: ordersMongo
//         }
//         break;
//     default:
//         break;
// }


// export default dao

import args from "../utils/args.js";

let dao = {}

const environment = args.env

switch (environment) {
    case "dev":
        console.log("MEMORY CONNECTED");
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
        console.log("FS CONNECTED");
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
        console.log("MONGO CONNECTED");
        const { default: productsMongo } = await import("./mongo/products.mongo.js");
        const { default: usersMongo } = await import("./mongo/users.mongo.js");
        const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
        dao = { products: productsMongo, users: usersMongo, orders: ordersMongo };
        break;
}

export default dao;


