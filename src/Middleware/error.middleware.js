require('dotenv').config()

const errorHandling = (err, req, res, next) => {
    if (err) {
        console.log(err)
        let errorResponse = {
            statusCode: err.statusCode || 500,
            message: 'Internal Server Error! Please visit log at server!',
            stack: err.stack,
        }
        if (!process.env.ENVIRONMENT || process.env.ENVIRONMENT !== 'DEVELOPMENT') { // trong môi trường production
            delete errorResponse.stack
        }
        else { // trong môi trường phát triển
            errorResponse.message = err.message ?? 'Internal Server Error! Please visit log at server!'
        }
        res.status(errorResponse.statusCode).json(errorResponse)
    }
}

module.exports = errorHandling
