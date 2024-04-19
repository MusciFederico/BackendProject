import MongoManager from "./manager.mongo.js";
import Order from "./models/order.model.js";

const ordersManager = new MongoManager(Order);

export default ordersManager
