import jwt from "jsonwebtoken"

function createToken(data) {
    const token = jwt.sign(
        data, //data a encriptar (convertir a token)
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 * 7 }
    )
    return token
}

function verifytoken(headers) {
    const token = headers.token;
    if (token) {
        const data = jwt.verify(token, process.env.SECRET);
        //que pasa si no verifica
        return data;
    }
    const error = new Error("bad auth"); error.statusCode = 401;
    throw error;
}

export { verifytoken, createToken };

// import jwt from 'jsonwebtoken';

// function verifyToken(headers) {
//     const token = headers.token;
//     if (token) {
//         try {
//             const data = jwt.verify(token, 'your_secret_key'); // Reemplaza 'your_secret_key' con tu clave secreta
//             return data;
//         } catch (error) {
//             // Error al verificar el token
//             throw new Error("Token verification failed");
//         }
//     } else {
//         const error = new Error("Unauthorized");
//         error.statusCode = 401;
//         throw error;
//     }
// }

// export default verifyToken;
