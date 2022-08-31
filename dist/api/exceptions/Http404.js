"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../../infrastructure/abstracts/HttpError"));
class Http404 extends HttpError_1.default {
    name = "NotFound";
    code = 404;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = Http404;
//# sourceMappingURL=Http404.js.map