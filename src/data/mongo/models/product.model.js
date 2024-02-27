import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema({
    name: { type: String, required: true, index: true },
    img: { type: String, required: true },
    place: { type: String, required: true },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 },
}, {
    timestamps: true
});

const Product = model(collection, schema);

export default Product;
