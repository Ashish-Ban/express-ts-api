import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { UsersController } from './api/controllers/Users/UsersController';
import Db from './config/db';
import LoginController from './api/controllers/Auth/LoginController';
import RegisterController from './api/controllers/Auth/RegisterController';
import morgan from 'morgan';
import DummyController from './api/controllers/Dummy/DummyController';
import ErrorHandler from './infrastructure/middlewares/ErrorHandler';

dotenv.config();


interface ServerConfig {
    port: number;
    host: string;
}

class Server {
    private app: express.Application = express();
    private config!: ServerConfig;
    private db!: Db;

    constructor(configObj: ServerConfig) {
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
        this.db = new Db({
            dbHost: "localhost",
            dbName: "usersapp",
            dbPort: 27017
        })
    }

    addMiddlewares() {
        this.app.use(morgan("tiny"));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
    }

    addControllers(app: express.Application) {
        new UsersController(app, '/users', this.db);
        new LoginController(app, '/account/login', this.db);
        new RegisterController(app, '/account/register', this.db);
        new DummyController(app, "/private/dummy", this.db);
    }

    addEndMiddlewares = () => {
        this.app.use(ErrorHandler);
    }

    runServer() {
        this.app.listen(this.config.port, this.config.host, () => {
            console.log(`Server running at http://${this.config.host}:${this.config.port}`)
        })
    }
}

new Server({ host: "localhost", port: 3000 });