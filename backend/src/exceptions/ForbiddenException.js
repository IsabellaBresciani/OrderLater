const Exception = require("./Exception");

class ForbiddenException extends Exception {
    constructor(message = 'forbidden', detail) {
        super(403, message, detail);
    }
}

module.exports = ForbiddenException;