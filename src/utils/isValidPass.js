// function isValidPass(formPassword, dbPassword) {
//     if (formPassword !== dbPassword) {
//         const error = new Error("Invalid credentials");
//         error.statusCode = 401;
//         throw error;
//     }
// }

// export default isValidPass;
import CustomError from "./customError";
import errors from "./errorLibrary";

function isValidPass(formPassword, dbPassword) {
    if (formPassword !== dbPassword) {
        CustomError.new(errors.auth)
    }
}

export default isValidPass;