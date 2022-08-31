"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../abstracts/HttpError"));
function ErrorHandler(err, req, res, next) {
    if (err instanceof HttpError_1.default) {
        return res.status(err.code).json({ error: "" + err.message });
    }
    else {
        console.log("Error : ", err);
        return res.status(500).json({ error: "Internal" });
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map