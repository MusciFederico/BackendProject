// import { usersManager } from '../data/mongo/manager.mongo.js';
// import isValidPass from '../utils/isValidPass.js';

// async function isValidPassMid(req, res, next) {
//     try {
//         const { email, password } = req.body;
//         const one = await usersManager.readByEmail(email);
//         const dbPassword = one.password;
//         isValidPass(password, dbPassword);
//         return next();
//     } catch (error) {
//         return next(error);
//     }
// }

// export default isValidPassMid;
import usersManager from '../data/mongo/users.mongo.js';
import isValidPass from '../utils/isValidPass.js';

async function isValidPassMid(req, res, next) {
    try {
        const { email, password } = req.body;
        const one = await usersManager.readByEmail(email);
        const dbPassword = one.password;
        isValidPass(password, dbPassword);
        return next();
    } catch (error) {
        return next(error);
    }
}

export default isValidPassMid;
