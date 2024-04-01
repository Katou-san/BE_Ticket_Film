// test version - no use in product

class ApiError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode ?? 500
    }
}

module.exports = ApiError