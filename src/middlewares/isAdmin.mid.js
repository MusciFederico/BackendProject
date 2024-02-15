const isAdminMid = (req, res, next) => {
    try {
        const { role } = req.session;
        console.log(role);
        if (role === "admin") {
            return next();
        } else {
            const error = new Error("Forbidden");
            error.statusCode = 403;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
};

export default isAdminMid;
