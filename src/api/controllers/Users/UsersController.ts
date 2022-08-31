import { Application, NextFunction, Request, Response, Router, RouterOptions } from "express";
import Db from "../../../config/db";
import { IUsers } from "../../models/Users";
import UserService from "../../services/UserService";

export class UsersController {
    basePath!: string;
    userService!: UserService;
    routerOptions!: RouterOptions | null;
    router!: Router;

    constructor(
        app: Application,
        basePath: string = "/",
        db: Db,
        routerOptions?: RouterOptions | null
    ) {
        this.basePath = basePath;
        this.routerOptions = routerOptions ?? null;
        this.userService = new UserService(db);
        this.configureRoutes(app);
    }

    configureRoutes(app: Application) {
        this.router = this.routerOptions === null ? Router() : Router(this.routerOptions);
        this.router.get("/", this.get);
        this.router.post("/", this.createUser);
        this.router.get("/:uid", this.getUser);
        this.router.put("/:uid", this.updateUser);
        this.router.delete("/:uid", this.deleteUser);
        this.router.use("*", this.handleOtherPaths);
        app.use(this.basePath, this.router);
    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getUsers();
            return res.send({ data: "Welcome to users!", users });
        } catch (error: any) {
            next(error)
        }
    }

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.uid) return res.status(400).send({ error: 'UID required' });
        const uid = Number(req.params.uid);
        try {
            const user = await this.userService.getUserById(uid);
            return res.send({ user });
        } catch (error: any) {
            console.log("Get User Controller error caught ", error)
            next(error)
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("req.body : ", req.body);
            const { username, password }: IUsers = req.body;
            const user = await this.userService.createUser(username, password)
            console.log("User in createUser : ", user);
            return res.send({ user })
        } catch (error: any) {
            console.log("UserController -> CreateUser Error: ", error)
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.params.uid) throw new Error("parameter `uid` required");
            const { username, password }: Partial<IUsers> = req.body;
            const data: Partial<IUsers> = {};
            // filter out and pass necessary data, unnecessary data from body is avoided here.
            if (username) data["username"] = username;
            if (password) data["password"] = password;
            const user = await this.userService.updateUser(Number(req.params.uid), data);
            return res.status(201).json({ user: user })
        } catch (error: any) {
            console.log("UserController -> updateUser Error : ", error);
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.params.uid) throw new Error("uid required !");
            const uid = Number(req.params.uid);
            await this.userService.deleteUser(uid);
            return res.status(200).send()
        } catch (error: any) {
            console.log("UserController -> deleteUser Error: ", error);
            next(error)
        }
    }

    handleOtherPaths(req: Request, res: Response) {
        return res.status(501).send()
    }

}