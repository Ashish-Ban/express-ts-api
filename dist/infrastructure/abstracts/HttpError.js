"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    name;
    code;
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = HttpError;
//# sourceMappingURL=HttpError.js.map