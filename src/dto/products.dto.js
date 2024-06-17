import args from "../utils/args.js";
import crypto from 'crypto';

class ProductDTO {
    constructor(data) {
        args.env !== "prod" && (this.id = crypto.randomBytes(12).toString('hex'))
        this.name = data.name,
            this.img = data.img,
            this.place = data.place,
            this.price = data.price || 10,
            this.stock = data.stock || 50,
            this.owner = data.owner
        this.date = data.date || new Date()
        args.env !== "prod" && (this.updatedAt = new Date())
        args.env !== "prod" && (this.createdAt = new Date())
    }
}

export default ProductDTO