// import args from "../utils/args.js";
// import crypto from 'crypto';

// class OrderDTO {
//     constructor(data) {
//         args.env !== "prod" && (this.id = crypto.randomBytes(12).toString('hex'))
//         this.user_id = data.user_id,
//             this.product_id = data.product_id,
//             this.quantity = data.quantity || 1,
//             this.state = data.state || "reserved",
//             this.date = data.date || new Date()
//         args.env !== "prod" && (this.updatedAt = new Date())
//         args.env !== "prod" && (this.createdAt = new Date())
//     }
// }

// export default OrderDTO

class CheckoutDTO {
    constructor(data) {
        this.price_data = {
            product_data: { name: data.product_id.name },
            currency: "usd",
            unit_amount: data.product_id.price * 100
        }
        this.quantity = data.quantity;
    }
}

export default CheckoutDTO