import { NextFunction, Request, Response } from "express";
import Http401 from "../../api/exceptions/Http401";
import AuthService from "../../api/services/AuthService";

export default function JwtMiddleware(authService: AuthService) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const valid = authService.verify(req);
            next()
        } catch (error: any) {
            console.log("JwtMiddelware Error :", error.message);
            if (
                error.name === "JsonWebTokenError" ||
                error.name === "NotBeforeError" ||
                error.name === "TokenExpiredError"
            ) {
                next(new Http401("Invalid token"))
            } else {
                next(error)
            }
        }
    }
}