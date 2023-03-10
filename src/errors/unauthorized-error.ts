import { CustomeError } from "./custome-error";

export class UnauthorizedError extends CustomeError {
    statusCode = 401;
    constructor() {
        super('Invalid credentials');

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Invalid credentials' }];
    }
}