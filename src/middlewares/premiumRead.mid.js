// import logger from '../utils/logger/logger.factory.js';
// import CustomError from '../utils/customError.js';
// import errors from '../utils/errorLibrary.js';
// import usersManager from '../data/mongo/users.mongo.js';
// import { verifytoken } from '../utils/token.js';

// const premiumRead = async (req, res, next) => {
//     try {
//         let role;
//         let email;

//         if (req.cookies.token) {
//             const token = req.cookies.token;
//             const data = verifytoken(token);
//             role = data.role;
//             email = data.email; // Assuming the token contains email
//         }
//         const owner = await usersManager.readByEmail(email); // Corrected syntax
//         console.log(role);
//         console.log(email);
//         console.log(owner);

//         if (role === 2) {
//             const ownerFilter = { owner: { $ne: owner._id } };
//             console.log(ownerFilter);
//             const filterObj = req.query.filter ? JSON.parse(req.query.filter) : {};
//             req.query.filter = JSON.stringify({ ...filterObj, ...ownerFilter });
//             next();
//         } else {
//             next();
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// export default premiumRead;
import logger from '../utils/logger/logger.factory.js';
import CustomError from '../utils/customError.js';
import errors from '../utils/errorLibrary.js';
import usersManager from '../data/mongo/users.mongo.js';
import { verifytoken } from '../utils/token.js';

const premiumRead = async (req, res, next) => {
    try {
        let role;
        let email;
        let userId;
        let user;

        if (req.cookies.token) {
            const token = req.cookies.token;
            const data = verifytoken(token);
            role = data.role;
            email = data.email; // Assuming the token contains email
            user = await usersManager.readByEmail(email);
            userId = user._id.toString(); // Convert ObjectId to string
        }

        if (role === 2) {
            const ownerFilter = { owner: { $ne: userId } }; // Use the string ID
            const filterObj = req.query.filter ? JSON.parse(req.query.filter) : {};
            req.query.filter = JSON.stringify({ ...filterObj, ...ownerFilter });
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default premiumRead;

