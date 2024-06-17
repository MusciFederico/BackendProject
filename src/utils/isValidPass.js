import CustomError from "./customError";
import errors from "./errorLibrary";

function isValidPass(formPassword, dbPassword) {
    try {
        if (formPassword !== dbPassword) {
            CustomError.new(errors.auth)
        }
    }
    catch (error) {
        throw error
    }
}

export default isValidPass;