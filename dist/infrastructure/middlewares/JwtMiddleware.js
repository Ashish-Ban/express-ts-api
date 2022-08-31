"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http401_1 = __importDefault(require("../../api/exceptions/Http401"));
function JwtMiddleware(authService) {
    return function (req, res, next) {
        try {
            const valid = authService.verify(req);
            next();
        }
        catch (error) {
            console.log("JwtMiddelware Error :", error.message);
            if (error.name === "JsonWebTokenError" ||
                error.name === "NotBeforeError" ||
                error.name === "TokenExpiredError") {
                next(new Http401_1.default("Invalid token"));
            }
            else {
                next(error);
            }
        }
    };
}
exports.default = JwtMiddleware;
//# sourceMappingURL=JwtMiddleware.js.map