module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        });
    }

    if (process.env.NODE_ENV === 'production') {
        let message = err.message;
        let error = new Error(message);

        if (err.name === "ValidatorError" && err.errors && typeof err.errors === 'object') {
            message = Object.values(err.errors).map(value => value.message).join(', ');
            error = new Error(message);
        }

        if (err.name === "CastError") {
            let message = `Resource not found: ${err.path}`;
            error = new Error(message);
        }
        if(err.code == 11000){
            let message = `Duplicate ${Object.keys(err.keyValue)} error`
            error = new Error(message)
        }
        if(err.name == 'JSONWebTokenError'){
            let message = `JSON web token is invalid. Try agin`
            error = new Error(message)
        }
        if(err.name == 'TokenExpiredError'){
            let message = `JSON web token is expired`
            error = new Error(message)
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }

    return res.status(err.statusCode).json({
        success: false,
        message: "An unexpected error occurred",
    });
};
