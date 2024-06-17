import { verifytoken } from "../utils/token.js"
import CustomError from "../utils/customError.js";
import errors from "../utils/errorLibrary.js";
export default (req, res, next) => {
    try {
        let userData
        if (req.cookies.token) {
            const token = req.cookies.token;
            userData = verifytoken(token)
        }
        if (userData) {
            CustomError.new(errors.forbidden)
        } else {
            return next()
        }
    } catch (error) {
        return next(error)
    }
}