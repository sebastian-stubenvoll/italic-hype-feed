class TokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "TokenError";
    }
}

class RequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "RequestError";
    }
}


module.exports = { TokenError, RequestError };
