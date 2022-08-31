"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../../infrastructure/abstracts/HttpError"));
class Http400 extends HttpError_1.default {
    name = "BadRequest";
    code = 400;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = Http400;
//# sourceMappingURL=Http400.js.map