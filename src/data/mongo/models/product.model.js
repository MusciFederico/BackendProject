// import { model, Schema } from "mongoose";
const { model, Schema } = require("mongoose");

const collection = "products";

const schema = new Schema({
    name: { type: String, required: true },
    poster: { type: String, required: true },
    place: { type: String, required: true },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 },
    // date: { type: Date, default: newDate() }
}, {
    timestamps: true
})

const Product = model(collection, schema)

module.exports = Product;
