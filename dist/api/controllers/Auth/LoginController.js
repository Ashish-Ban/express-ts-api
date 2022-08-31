"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthService_1 = __importDefault(require("../../services/AuthService"));
class LoginController {
    basePath;
    routerOptions;
    router;
    authService;
    constructor(app, basePath = "/login", db, routerOptions) {
        this.basePath = basePath;
        this.routerOptions = routerOptions ?? null;
        this.authService = new AuthService_1.default(db);
        this.configureRoutes(app);
    }
    configureRoutes = (app) => {
        this.router = this.routerOptions === null ? (0, express_1.Router)() : (0, express_1.Router)(this.routerOptions);
        this.router.post("/", this.post);
        app.use(this.basePath, this.router);
    };
    post = async (req, res, next) => {
        try {
            const token = await this.authService.login(req.body);
            return res.status(200).json({ token });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map