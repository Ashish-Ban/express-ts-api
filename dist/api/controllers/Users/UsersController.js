"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const express_1 = require("express");
const UserService_1 = __importDefault(require("../../services/UserService"));
class UsersController {
    basePath;
    userService;
    routerOptions;
    router;
    constructor(app, basePath = "/", db, routerOptions) {
        this.basePath = basePath;
        this.routerOptions = routerOptions ?? null;
        this.userService = new UserService_1.default(db);
        this.configureRoutes(app);
    }
    configureRoutes(app) {
        this.router = this.routerOptions === null ? (0, express_1.Router)() : (0, express_1.Router)(this.routerOptions);
        this.router.get("/", this.get);
        this.router.post("/", this.createUser);
        this.router.get("/:uid", this.getUser);
        this.router.put("/:uid", this.updateUser);
        this.router.delete("/:uid", this.deleteUser);
        this.router.use("*", this.handleOtherPaths);
        app.use(this.basePath, this.router);
    }
    get = async (req, res, next) => {
        try {
            const users = await this.userService.getUsers();
            return res.send({ data: "Welcome to users!", users });
        }
        catch (error) {
            next(error);
        }
    };
    getUser = async (req, res, next) => {
        if (!req.params.uid)
            return res.status(400).send({ error: 'UID required' });
        const uid = Number(req.params.uid);
        try {
            const user = await this.userService.getUserById(uid);
            return res.send({ user });
        }
        catch (error) {
            console.log("Get User Controller error caught ", error);
            next(error);
        }
    };
    createUser = async (req, res, next) => {
        try {
            console.log("req.body : ", req.body);
            const { username, password } = req.body;
            const user = await this.userService.createUser(username, password);
            console.log("User in createUser : ", user);
            return res.send({ user });
        }
        catch (error) {
            console.log("UserController -> CreateUser Error: ", error);
            next(error);
        }
    };
    updateUser = async (req, res, next) => {
        try {
            if (!req.params.uid)
                throw new Error("parameter `uid` required");
            const { username, password } = req.body;
            const data = {};
            // filter out and pass necessary data, unnecessary data from body is avoided here.
            if (username)
                data["username"] = username;
            if (password)
                data["password"] = password;
            const user = await this.userService.updateUser(Number(req.params.uid), data);
            return res.status(201).json({ user: user });
        }
        catch (error) {
            console.log("UserController -> updateUser Error : ", error);
            next(error);
        }
    };
    deleteUser = async (req, res, next) => {
        try {
            if (!req.params.uid)
                throw new Error("uid required !");
            const uid = Number(req.params.uid);
            await this.userService.deleteUser(uid);
            return res.status(200).send();
        }
        catch (error) {
            console.log("UserController -> deleteUser Error: ", error);
            next(error);
        }
    };
    handleOtherPaths(req, res) {
        return res.status(501).send();
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map