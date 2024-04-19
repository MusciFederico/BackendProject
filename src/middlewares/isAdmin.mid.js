import { verifytoken } from "../utils/token.js";
import CustomError from "../utils/customError.js";
import errors from "../utils/errorLibrary.js";

export default (req, res, next) => {
    try {
        const { role } = req.user;
        if (role === 1) {
            return next();
        } else {
            CustomError.new(errors.forbidden)
        }
    } catch (error) {
        return next(error);
    }
};