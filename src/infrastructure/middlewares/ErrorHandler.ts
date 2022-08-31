import { NextFunction, Request, Response } from "express";
import HttpError from "../abstracts/HttpError";

export default function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        return res.status(err.code).json({ error: "" + err.message })
    } else {
        console.log("Error : ", err);
        return res.status(500).json({ error: "Internal" })
    }
}