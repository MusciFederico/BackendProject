import has8CharUtils from "../utils/has8char.js";

const has8charMid = (req, res, next) => {
    try {
        const { password } = req.body;
        has8CharUtils(password);
        return next();
    } catch (error) {
        return next(error);
    }
};

export default has8charMid;