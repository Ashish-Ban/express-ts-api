import { Application, NextFunction, Request, Response, Router, RouterOptions } from "express";
import Db from "../../../config/db";
import HttpError from "../../../infrastructure/abstracts/HttpError";
import AuthService, { IAuthRequest } from "../../services/AuthService";

export default class LoginController {
    private basePath!: string;
    private routerOptions!: RouterOptions | null;
    private router!: Router;
    private authService!: AuthService;

    constructor(
        app: Application,
        basePath: string = "/login",
        db: Db,
        routerOptions?: RouterOptions | null,
    ) {
        this.basePath = basePath;
        this.routerOptions = routerOptions ?? null;
        this.authService = new AuthService(db);
        this.configureRoutes(app);
    }

    configureRoutes = (app: Application) => {
        this.router = this.routerOptions === null ? Router() : Router(this.routerOptions);
        this.router.post("/", this.post);
        app.use(this.basePath, this.router);
    }

    post = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await this.authService.login(req.body);
            return res.status(200).json({ token });
        } catch (error: any) {
            next(error);
        }
    }
}