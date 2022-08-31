"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("./api/controllers/Users/UsersController");
const db_1 = __importDefault(require("./config/db"));
const LoginController_1 = __importDefault(require("./api/controllers/Auth/LoginController"));
const RegisterController_1 = __importDefault(require("./api/controllers/Auth/RegisterController"));
const morgan_1 = __importDefault(require("morgan"));
const DummyController_1 = __importDefault(require("./api/controllers/Dummy/DummyController"));
const ErrorHandler_1 = __importDefault(require("./infrastructure/middlewares/ErrorHandler"));
dotenv_1.default.config();
class Server {
    app = (0, express_1.default)();
    config;
    db;
    constructor(configObj) {
        this.config = configObj;
        this.bootstrap();
    }
    bootstrap() {
        this.configDb();
        this.addMiddlewares();
        this.addControllers(this.app);
        this.addEndMiddlewares();
        this.runServer();
    }
    configDb() {
        this.db = new db_1.default({
            dbHost: "localhost",
            dbName: "usersapp",
            dbPort: 27017
        });
    }
    addMiddlewares() {
        this.app.use((0, morgan_1.default)("tiny"));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    addControllers(app) {
        new UsersController_1.UsersController(app, '/users', this.db);
        new LoginController_1.default(app, '/account/login', this.db);
        new RegisterController_1.default(app, '/account/register', this.db);
        new DummyController_1.default(app, "/private/dummy", this.db);
    }
    addEndMiddlewares = () => {
        this.app.use(ErrorHandler_1.default);
    };
    runServer() {
        this.app.listen(this.config.port, this.config.host, () => {
            console.log(`Server running at http://${this.config.host}:${this.config.port}`);
        });
    }
}
new Server({ host: "localhost", port: 3000 });
//# sourceMappingURL=server.js.map