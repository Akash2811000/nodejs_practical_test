import { NextFunction, Request, Response } from 'express';
import { CustomeError } from '../errors/custome-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomeError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.log("err", err);


    res.status(400).send({
        errors: [{
            message: 'Somethin went wrong'
        }]
    });
};
