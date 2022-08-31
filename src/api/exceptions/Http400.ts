import HttpError from "../../infrastructure/abstracts/HttpError";

export default class Http400 extends HttpError {
    name: string = "BadRequest";
    code: number = 400;
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}