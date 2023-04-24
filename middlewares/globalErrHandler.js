const globalErrHandler = (err, req, res, next) => {
    //status
    const status = err.status ? err.status : "failed";
    const statusCode = err.statusCode ? err.statusCode : 500;
    //message
    const message = err.message;
    //stack
    const stack = err.stack;

    res.status(statusCode).json({
        status,
        message,
        stack
    })
};

//NotFound Error

const NotFoundError = (req, res, next) => {
    const err = new Error(`C'ant resolve ${req.originalUrl} on this server`);
    next(err);
}

module.exports = {
    globalErrHandler, 
    NotFoundError
};