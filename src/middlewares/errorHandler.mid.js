// function errorHandler(error, req, res, next) {
//     console.log(error);
//     return res.json({
//         statusCode: error.statusCode || 500,
//         message: `${req.method} ${req.url} ${error.message}`
//     })
// }

// export default errorHandler


function errorHandler(error, req, res, next) {
    console.error(error);
    return res.json({
        statusCode: error.statusCode || 500,
        message: `${req.method} ${req.url} ${error.message}`
    });
}

module.exports = errorHandler;
