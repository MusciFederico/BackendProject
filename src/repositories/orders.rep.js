import OrderDTO from "../dto/orders.dto.js";
import dao from "../data/index.factory.js";

const { orders } = dao;

class OrdersRep {
    constructor() {
        this.model = orders
    }
    create = async (data) => {
        data = new OrderDTO(data)
        const response = await this.model.create(data);
        return response
    }
    read = async ({ filterObj, sortObj }) => await this.model.read({ filter: filterObj, sort: sortObj });
    readOne = async (id) => await this.model.readOne(id);
    update = async (id, data) => await this.model.update(id, data);
    destroy = async (id) => await this.model.destroy(id);
    report = async (uId) => await this.model.report(uId);
    readOrdersById = async (uId) => await this.model.readOrdersById(uId);
}

const ordersRep = new OrdersRep()
export default ordersRep