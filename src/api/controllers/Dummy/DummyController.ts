import { Application, Request, Response, Router, RouterOptions } from "express";
import Db from "../../../config/db";
import JwtMiddleware from "../../../infrastructure/middlewares/JwtMiddleware";
import AuthService from "../../services/AuthService";

export default class DummyController {
    private basePath!: string;
    private routerOptions!: RouterOptions | null;
    private router!: Router;
    private authService!: AuthService;

    constructor(
        app: Application,
        basePath: string = "/dummy",
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
        this.router.use(JwtMiddleware(this.authService));
        this.router.get("/", this.get)
        app.use(this.basePath, this.router);
    }

    get = (req: Request, res: Response) => {
        return res.status(200).json({ data: "Welcome" })
    }
}