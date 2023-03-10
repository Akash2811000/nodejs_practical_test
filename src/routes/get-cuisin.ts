import express, { Router } from 'express';
import CuisineController from '../controller/cuisin-controller';
import { currentUser } from '../middlware/auth-token';

const router = Router();
const cuisineController = new CuisineController();

router.get('/cuisin', currentUser, cuisineController.get);

export default router;