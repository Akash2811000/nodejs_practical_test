import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { ForbiddenError } from "../errors/forbidden-error";
import { JwtTokenExpiredError } from "../errors/token-expired-error";

// import * as dotenv from 'dotenv';
// dotenv.config();
export interface UserPayload {
    id: string;
    email: string;

}



declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {

    if (req.cookies.token == undefined) {
        throw new ForbiddenError();
    }
    if (req.cookies.token == undefined) {
        return next();
    }
    var token;
    if (req.cookies.token) {
        token = req.cookies.token;
    }
    console.log("token", req.cookies)

    try {

        var secretKeyJwt = 'jwt-sec';
        const payload = jwt.verify(token, secretKeyJwt!) as UserPayload;
        req.currentUser = payload;

    } catch (err: any) {


        if (err instanceof TokenExpiredError) {
            res.send(400).send('Token Expire')
        }

        res.send(400).send(err.message)
    }
    next();
}