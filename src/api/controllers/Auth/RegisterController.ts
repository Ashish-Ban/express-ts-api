import { Application, NextFunction, Request, Response, Router, RouterOptions } from "express";
import Db from "../../../config/db";
import AuthService, { IAuthRequest } from "../../services/AuthService";

export default class RegisterController {
    private basePath!: string;
    private routerOptions!: RouterOptions | null;
    private router!: Router;
    private authService!: AuthService;

    constructor(
        app: Application,
        basePath: string = "/account/register",
        db: Db,
        routerOptions?: RouterOptions | null
    ) {
        this.basePath = basePath;
        this.routerOptions = routerOptions ?? null;
        this.authService = new AuthService(db);
        this.configureRoutes(app);
    }

    configureRoutes(app: Application) {
        this.router = this.routerOptions === null ? Router() : Router(this.routerOptions);
        this.router.post("/", this.post);
        this.router.use("*", this.handleOtherPaths);
        app.use(this.basePath, this.router);
    }

    post = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password }: IAuthRequest = req.body;
            const user = await this.authService.register(username, password);
            return res.status(201).json({ user })
        } catch (error: any) {
            console.log("RegisterController -> post Error : ", error.message)
            next(error)
        }
    }

    handleOtherPaths(req: Request, res: Response) {
        return res.status(501).send()
    }
}