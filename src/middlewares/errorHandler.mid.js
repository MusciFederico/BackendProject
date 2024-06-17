import logger from "../utils/logger/logger.factory.js";

export default (error, req, res, next) => {
    if (!error.statusCode || error.statusCode === 500) {
        error.statusCode = 500;
        logger.ERROR(error.message);
    } else {
        logger.WARN(error.message);
    }
    return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        url: `${req.method} ${req.url}`,
        message: error.message,
    });
};
