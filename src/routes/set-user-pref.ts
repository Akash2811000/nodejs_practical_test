import express, { Request, Response } from 'express';
import { body, check, oneOf } from 'express-validator';
import PrefController from '../controller/user-pref-controller';
import { currentUser } from '../middlware/auth-token';
import { validateRequest } from '../middlware/validate-request';

var router = express.Router();
const userPrefController = new PrefController();
router.post('/setpref',
    [
        body('cousinId')
            .trim()
            .isInt()
            .notEmpty()
            .optional()
            .withMessage('cousinId can not be empty'),
        body('price_range')
            .trim()
            .isInt()
            .notEmpty()
            .optional()
            .isIn([0, 1, 2, 3])
            .withMessage('price_range can not be empty'),
        oneOf([
            check('cousinId').notEmpty(),
            check('price_range').notEmpty(),
        ], "Atleast one of the field must be provided")

    ],
    currentUser,
    validateRequest, userPrefController.addPref);

export { router as setprefRoute };