const errors = {
    error: { message: "Error", statusCode: 400 },
    auth: { message: "Bad auth", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not found", statusCode: 404 },
    password: { message: "Password>8char", statusCode: 406 },
    fatal: { message: "Fatal", statusCode: 500 },
    emailRegex: { message: "Bad Email format ", statusCode: 422 },
};
export default errors;