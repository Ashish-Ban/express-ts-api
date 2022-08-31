import HttpError from "../../infrastructure/abstracts/HttpError";

export default class Http401 extends HttpError {
    name: string = "Unauthorized";
    code: number = 401;
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}