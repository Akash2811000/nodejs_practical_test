import { CustomeError } from "./custome-error";

export class JwtTokenExpiredError extends CustomeError {
    statusCode = 401;
    constructor() {
        super('jwt expired');

        Object.setPrototypeOf(this, JwtTokenExpiredError.prototype);
    }

    serializeErrors() {
        return [{ message: 'jwt expired Please Login Again' }];
    }
}