import { CustomeError } from "./custome-error";

export class ForbiddenError extends CustomeError {
    statusCode = 403;
    constructor() {
        super('Insufficient rights to a resource');

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Insufficient rights to a resource' }];
    }
}