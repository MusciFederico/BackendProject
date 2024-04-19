import ProductDTO from "../dto/products.dto.js";
import dao from "../data/index.factory.js";

const { products } = dao;

class ProductsRep {
    constructor() {
        this.model = products
    }
    create = async (data) => {
        data = new ProductDTO(data)
        const response = await this.model.create(data);
        return response
    }
    read = async ({ filterObj, sortObj }) => await this.model.read({ filter: filterObj, sort: sortObj });
    readOne = async (id) => await this.model.readOne(id);
    update = async (id, data) => await this.model.update(id, data);
    destroy = async (id) => await this.model.destroy(id);
}

const productsRep = new ProductsRep()
export default productsRep