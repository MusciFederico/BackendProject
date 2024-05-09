// function has8CharUtils(password) {
//     if (password.length < 8) {
//         const error = new Error("Password must be at least 8 characters long");
//         error.statusCode = 406;
//         throw error;
//     }
// }

// export default has8CharUtils;
import CustomError from "./customError";
import errors from "./errorLibrary";

function has8CharUtils(password) {
    if (password.length < 8) {
        CustomError.new(errors.password)
    }
}

export default has8CharUtils;

