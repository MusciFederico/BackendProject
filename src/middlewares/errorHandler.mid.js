
// const errorHandler = (error, req, res, next) => {
//     console.error(error);
//     return res.status(error.statusCode || 500).json({
//         statusCode: error.statusCode || 500,
//         url: `${req.method} ${req.url}`,
//         message: error.message,
//     });
// };
// export default errorHandler;
import logger from "../utils/logger/logger.factory.js";

export default (error, req, res, next) => {
    if (!error.statusCode || error.statusCode === 500) {
        error.statusCode = 500;
        logger.ERROR(error.message);
    } else {
        logger.WARN(error.message);
    }
    return res.json({
        statusCode: error.statusCode,
        url: `${req.method} ${req.url}`,
        message: error.message,
    });
};

