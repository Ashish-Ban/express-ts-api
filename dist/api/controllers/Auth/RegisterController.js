"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthService_1 = __importDefault(require("../../services/AuthService"));
class RegisterController {
    basePath;
    routerOptions;
    router;
    authService;
    constructor(app, basePath = "/account/register", db, routerOptions) {
        this.basePath = basePath;
        this.routerOptions = routerOptions ?? null;
        this.authService = new AuthService_1.default(db);
        this.configureRoutes(app);
    }
    configureRoutes(app) {
        this.router = this.routerOptions === null ? (0, express_1.Router)() : (0, express_1.Router)(this.routerOptions);
        this.router.post("/", this.post);
        this.router.use("*", this.handleOtherPaths);
        app.use(this.basePath, this.router);
    }
    post = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await this.authService.register(username, password);
            return res.status(201).json({ user });
        }
        catch (error) {
            console.log("RegisterController -> post Error : ", error.message);
            next(error);
        }
    };
    handleOtherPaths(req, res) {
        return res.status(501).send();
    }
}
exports.default = RegisterController;
//# sourceMappingURL=RegisterController.js.map