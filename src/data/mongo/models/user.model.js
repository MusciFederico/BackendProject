// import { model, Schema } from "mongoose";

// const collection = "users";

// const schema = new Schema({
//     name: { type: String, required: true },
//     last_name: { type: String },
//     email: { type: String, required: true, unique: true, index: true },
//     password: { type: String, required: true },
//     photo: { type: String, default: "https://i.postimg.cc/wTgNFWhR/profile.png" },
//     age: { type: Number, default: 18 },
// }, { 
//     timestamps: true 
// });

// const User = model(collection, schema);

// export default User;
import { model, Schema } from "mongoose";

const collection = "users";

const schema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: { type: String, default: "https://i.postimg.cc/wTgNFWhR/profile.png" },
    age: { type: Number, default: 18 },
    verified: { type: Boolean, default: false },
    role: {
        type: Number,
        default: 0,
        enum: [0, 1, 2]
    },
}, {
    timestamps: true
});

const User = model(collection, schema);

export default User;

