import express, { Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { validateRequest } from '../middlware/validate-request';
import { body } from "express-validator";
import { BadRequestError } from '../errors/bad-request-error';
import { MailService } from "../service/email-service";
import otpGenerator from "otp-generator";
const router = express.Router();
router.post(
    '/emailsent',
    [
        body("email")
            .notEmpty()
            .isEmail()
            .withMessage("Email must be valid"),

    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email } = req.body;
        const randomId = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        const expirationDate = new Date();
        expirationDate.setHours(new Date().getHours() + 1);
        const payload = {
            email: email,
            id: randomId,
            expirationDate
        }

        const token = jwt.sign(payload, 'jwt-sec');

        try {
            const link = `http://localhost:4000/app/account?token=${token}`
            await MailService.sendEmail(email,
                ` <h1>Hello  ${email} 
               ${link} 
              </B> </br> It is valid for 1 hours. </p>`);
            const emilsent = {
                email,
                message: "Mail Sucesfully sent..",
                link: link
            }
            res.send(emilsent);

        } catch (error: any) {
            throw new BadRequestError(error.message);
        }


    }
);

export { router as emailSentUser };