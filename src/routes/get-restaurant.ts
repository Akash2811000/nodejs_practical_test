import express, { Router } from 'express';
import CuisineController from '../controller/cuisin-controller';
import RestaurantController from '../controller/restaurant-controller';
import { currentUser } from '../middlware/auth-token';

const router = Router();
const restaurantController = new RestaurantController();

router.get('/restaurant', currentUser, restaurantController.get);

export { router as restaurantRoute };