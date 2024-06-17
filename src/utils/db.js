import { connect } from "mongoose";
import env from "./env.js";
import logger from "./logger/logger.factory.js";

const dbConnection = async () => {
    try {
        logger.INFO("environment", env);
        await connect(env.DB_LINK);
        logger.INFO("db connected",);
    } catch (error) {
        logger.ERROR(error);
    }
};

export default dbConnection;
