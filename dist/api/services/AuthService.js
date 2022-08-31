"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("./UserService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Http400_1 = __importDefault(require("../exceptions/Http400"));
const Http401_1 = __importDefault(require("../exceptions/Http401"));
class AuthService {
    _db;
    _userService;
    secret;
    tokenHeader;
    constructor(db) {
        this._db = db;
        this._userService = new UserService_1.default(db);
        this.secret = process.env.JWT_SECRET_KEY ?? null;
        this.tokenHeader = process.env.TOKEN_HEADER_KEY ?? null;
    }
    register = async (username, password) => {
        return await this._userService.createUser(username, password);
    };
    login = async (credentials, options) => {
        if (!this.secret)
            throw new Error("jwt not set");
        if (!credentials.username || !credentials.password)
            throw new Http400_1.default("Missing Parameters");
        const user = await this._userService.getUserByCredentials(credentials.username, credentials.password);
        if (!user)
            throw new Http401_1.default("No user found");
        const data = {
            sub: user.uid,
            name: user.username,
            username: user.username,
            uid: user.uid,
            iat: new Date().getSeconds()
        };
        const token = jsonwebtoken_1.default.sign(data, this.secret);
        return token;
    };
    verify(req, options) {
        if (!this.tokenHeader)
            throw new Error("jwt not set");
        if (!this.secret)
            throw new Error("jwt not set");
        const token = req.header(this.tokenHeader);
        if (!token)
            throw new Http400_1.default("auth token missing");
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map