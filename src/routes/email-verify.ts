import express, { Response } from "express";
import jwt from "jsonwebtoken";
import UserController from "../controller/user-controller";
import { validateRequest } from '../middlware/validate-request';
const router = express.Router();
router.get(
    '/account',

    validateRequest,
    async (req: any, res: Response) => {
        let decoded: any;
        const token: any = req.query.token;
        try {
            decoded = jwt.verify(token, 'jwt-sec');

            if (!decoded.hasOwnProperty("email") || !decoded.hasOwnProperty("expirationDate")) {
                res.status(403)
                res.send("Invalid auth credentials.")
                return
            }
            const { expirationDate } = decoded;
            if (expirationDate < new Date()) {
                res.status(403)
                return res.send("Token has expired.")

            }
            const userController = new UserController();

            const data = {
                id: decoded.id,
                email: decoded.email
            }
            userController.addUser(req, res, data, token);

            // res.status(200)

            // return res.send("User has been validated.")
        } catch (error: any) {
            res.status(400).send(error.message)
        }
    }
);

export { router as emailVerify };
