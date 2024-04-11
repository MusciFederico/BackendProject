import { connect } from "mongoose";
import env from "./env.js";

const dbConnection = async () => {
    try {
        await connect(env.DB_LINK);
        console.log("db connected",);
    } catch (error) {
        console.log(error);
    }
};

export default dbConnection;
