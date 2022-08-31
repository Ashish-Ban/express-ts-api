import Db from "../../config/db";
import UserService from "./UserService";
import jwt from 'jsonwebtoken';
import Http400 from "../exceptions/Http400";
import Http401 from "../exceptions/Http401";
import { Request } from "express";

export interface IAuthRequest {
    username: string;
    password: string;
}

export default class AuthService {
    private _db!: Db;
    private _userService: UserService;
    private secret!: string | null;
    private tokenHeader!: string | null;

    constructor(
        db: Db,
    ) {
        this._db = db;
        this._userService = new UserService(db);
        this.secret = process.env.JWT_SECRET_KEY ?? null
        this.tokenHeader = process.env.TOKEN_HEADER_KEY ?? null
    }

    register = async (username: string, password: string) => {
        return await this._userService.createUser(username, password);
    }

    login = async (credentials: IAuthRequest, options?: any) => {
        if (!this.secret) throw new Error("jwt not set");

        if (!credentials.username || !credentials.password) throw new Http400("Missing Parameters")
        const user = await this._userService.getUserByCredentials(credentials.username, credentials.password);

        if (!user) throw new Http401("No user found");
        const data = {
            sub: user.uid,
            name: user.username,
            username: user.username,
            uid: user.uid,
            iat: new Date().getSeconds()
        }
        const token = jwt.sign(data, this.secret);
        return token;
    }

    verify(req: Request, options?: any) {
        if (!this.tokenHeader) throw new Error("jwt not set");
        if (!this.secret) throw new Error("jwt not set");
        const token = req.header(this.tokenHeader);
        if (!token) throw new Http400("auth token missing");
        return jwt.verify(token, this.secret);
    }
}