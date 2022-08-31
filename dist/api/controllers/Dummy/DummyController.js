"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JwtMiddleware_1 = __importDefault(require("../../../infrastructure/middlewares/JwtMiddleware"));
const AuthService_1 = __importDefault(require("../../services/AuthService"));
class DummyController {
    basePath;
    routerOptions;
    router;
    authService;
    constructor(app, basePath = "/dummy", db, routerOptions) {
        this.basePath = basePath;
        this.routerOptions = routerOptions ?? null;
        this.authService = new AuthService_1.default(db);
        this.configureRoutes(app);
    }
    configureRoutes(app) {
        this.router = this.routerOptions === null ? (0, express_1.Router)() : (0, express_1.Router)(this.routerOptions);
        this.router.use((0, JwtMiddleware_1.default)(this.authService));
        this.router.get("/", this.get);
        app.use(this.basePath, this.router);
    }
    get = (req, res) => {
        return res.status(200).json({ data: "Welcome" });
    };
}
exports.default = DummyController;
//# sourceMappingURL=DummyController.js.map