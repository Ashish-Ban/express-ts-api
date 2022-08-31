"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../../infrastructure/abstracts/HttpError"));
class Http401 extends HttpError_1.default {
    name = "Unauthorized";
    code = 401;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = Http401;
//# sourceMappingURL=Http401.js.map