import jwt from "jsonwebtoken"
import CustomError from "./customError.js";
import errors from "./errorLibrary.js";

function createToken(data) {
    const token = jwt.sign(
        data, //data a encriptar (convertir a token)
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 * 7 }
    )
    return token
}

function verifytoken(token) {
    try {
        if (token) {
            const data = jwt.verify(token, process.env.SECRET);
            //que pasa si no verifica
            return data;
        } else {
            CustomError.new(errors.auth)
        }
    } catch (error) {
        throw error;
    }
}

export { verifytoken, createToken };