import passport from "passport";

export default (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, (error, user, info = {}) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                const { statusCode = 401, message } = info;
                const errorMessage = typeof message === "string" ? message : JSON.stringify(message) || info.toString();
                return res.status(statusCode).json({
                    statusCode,
                    message: errorMessage,
                });
            }
            req.user = user;
            return next();
        })(req, res, next);
    };
};
