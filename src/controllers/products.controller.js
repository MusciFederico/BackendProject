import productsService from '../services/products.services.js';
import CustomError from '../utils/customError.js';
import errors from '../utils/errorLibrary.js';

class ProductsController {
    constructor() {
        this.service = productsService;
    }

    create = async (req, res, next) => {
        try {
            const { name, price, stock, img, place } = req.body;
            const numericPrice = parseFloat(price);
            const numericStock = parseInt(stock);

            if (isNaN(numericPrice) || isNaN(numericStock)) {
                CustomError.new(errors.error)
            }

            const newProduct = {
                name,
                img,
                place,
                price: numericPrice,
                stock: numericStock,
            };

            const createdProduct = await this.service.create(newProduct);

            res.success201(createdProduct)
        } catch (error) {
            next(error);
        }
    }
    read = async (req, res, next) => {
        try {
            const { filter, sort } = req.query;
            const filterObj = filter ? JSON.parse(filter) : {};
            const sortObj = sort ? JSON.parse(sort) : {};
            const allProducts = await this.service.read({ filter: filterObj, sort: sortObj });

            if (allProducts && allProducts.length > 0) {
                res.success200(allProducts);
            } else {
                CustomError.new(errors.notFound)
            }
        } catch (error) {
            next(error);
        }
    }
    readOne = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const one = await this.service.readOne(pid);
            return res.success200(one);
        } catch (error) {
            return next(error);
        }
    }
    update = async (req, res, next) => {
        try {
            const pid = req.params.pid;
            const data = req.body;
            const response = await this.service.update(pid, data);
            return res.success200(response);
        } catch (error) {
            return next(error);
        }
    }
    destroy = async (req, res, next) => {
        const productId = req.params.pid;
        try {
            const deleted = await this.service.destroy(productId);
            if (deleted) {
                res.success200(deleted);
            } else {
                CustomError.new(errors.notFound)

            }
        } catch (error) {
            next(error);
        }
    }
}

export default ProductsController;
const controler = new ProductsController();
const { create, read, readOne, update, destroy } = controler
export { create, read, readOne, update, destroy };