export default abstract class HttpError extends Error {
    name!: string;
    code!: number;
    message!: string;
    constructor(message: string) {
        super(message)
        this.message = message;
    }
}