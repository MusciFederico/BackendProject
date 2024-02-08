// import { model, Schema } from "mongoose";
const { model, Schema } = require("mongoose");

const collection = "users"

const schema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, default: "https://i.postimg.cc/wTgNFWhR/profile.png" },
    age: { type: Number, default: 18 },
}, { 
    timestamps: true 
})

const User = model(collection, schema)

module.exports = User;
