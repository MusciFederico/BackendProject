import CustomError from "./customError";
import errors from "./errorLibrary";

function has8CharUtils(password) {
    try {
        if (password.length < 8) {
            CustomError.new(errors.password)
        }
    } catch (error) {
        throw (error); // Propagate the error to the Express error handling middleware
    }
}

export default has8CharUtils;