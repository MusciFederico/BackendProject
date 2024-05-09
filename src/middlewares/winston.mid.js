import logger from "../utils/logger/logger.factory.js"; //puede ser que logger de factory y logger de req sean distintos

function winstonMid(req, res, next) {
    try {
        req.logger = logger
        const message = `${req.method} ${req.url} - ${(new Date()).toLocaleString()}`;
        req.logger.HTTP(message);
        return next();
    } catch (error) {
        return next(error)
    }
}

export default winstonMid