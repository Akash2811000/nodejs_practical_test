import pool from '../dbconfig/db.connection';
import express, { Request, Response } from 'express';
class RestaurantController {

    public async get(req: any, res: Response) {
        try {
            const userId: any = req.currentUser.id;
            const client = await pool.connect();
            const userPricePrefs = await client
                .query(`SELECT price_range FROM public.user_price_preference WHERE "user_id" = ${userId}`);
            const usercuisinePres = await client
                .query(`SELECT cuisine_id FROM public.user_cuisine_preference WHERE "user_id" = ${userId}`);
            var restaurantData: any;
            if (userPricePrefs.rows.length > 0 && usercuisinePres.rows.length) {
                console.log("0");
                restaurantData = await client.query(`select restaurant.id,restaurant.cover_image_url,
                restaurant.name,restaurant.fourquare_rating,restaurant.in_app_rating,
                restaurant.location,
                restaurant.price_range,
                restaurant.menu_url,
                restaurant.site,
                restaurant.review_count,
                restaurant.phone,
                restaurant_cuisine.cuisine_id 
                as cousinID , 
                restaurant_cuisine.restaurant_id as restid,
                cuisine.name as cuisinename
                from restaurant INNER JOIN restaurant_cuisine 
                on restaurant.id =restaurant_cuisine.restaurant_id
                INNER JOIN cuisine on restaurant_cuisine.cuisine_id = cuisine.id
                WHERE restaurant.price_range IN 
                (select price_range from user_price_preference where user_id = ${userId}) AND 
                restaurant_cuisine.cuisine_id  IN (
                select cuisine_id from user_cuisine_preference where user_id = ${userId})
                LIMIT 25`);

            }
            else if (userPricePrefs.rows.length > 0) {
                console.log("1");
                restaurantData = await client.query(`select restaurant.id,restaurant.cover_image_url,
                restaurant.name,restaurant.fourquare_rating,restaurant.in_app_rating,
                restaurant.location,
                restaurant.price_range,
                restaurant.menu_url,
                restaurant.site,
                restaurant.review_count,
                restaurant.phone,
                restaurant_cuisine.cuisine_id 
                as cousinID , 
                restaurant_cuisine.restaurant_id as restid,
                cuisine.name as cuisinename
                from restaurant INNER JOIN restaurant_cuisine 
                on restaurant.id =restaurant_cuisine.restaurant_id
                INNER JOIN cuisine on restaurant_cuisine.cuisine_id = cuisine.id
                WHERE restaurant.price_range IN 
                (select price_range from user_price_preference where user_id = ${userId})
                LIMIT 25`);
            }
            else if (usercuisinePres.rows.length > 0) {
                console.log("2");
                restaurantData = await client.query(`select restaurant.id,restaurant.cover_image_url,
                restaurant.name,restaurant.fourquare_rating,restaurant.in_app_rating,
                restaurant.location,
                restaurant.price_range,
                restaurant.menu_url,
                restaurant.site,
                restaurant.review_count,
                restaurant.phone,
                restaurant_cuisine.cuisine_id 
                as cousinID , 
                restaurant_cuisine.restaurant_id as restid,
                cuisine.name as cuisinename
                from restaurant INNER JOIN restaurant_cuisine 
                on restaurant.id =restaurant_cuisine.restaurant_id
                INNER JOIN cuisine on restaurant_cuisine.cuisine_id = cuisine.id
                WHERE 
                restaurant_cuisine.cuisine_id  IN (
                select cuisine_id from user_cuisine_preference where user_id = ${userId})
                LIMIT 25`);

            } else {
                console.log("3");
                restaurantData = await client.query(`select restaurant.id,restaurant.cover_image_url,
                restaurant.name,restaurant.fourquare_rating,restaurant.in_app_rating,
                restaurant.location,
                restaurant.price_range,
                restaurant.menu_url,
                restaurant.site,
                restaurant.review_count,
                restaurant.phone,
                restaurant_cuisine.cuisine_id 
                as cousinID , 
                restaurant_cuisine.restaurant_id as restid,
                cuisine.name as cuisinename
                from restaurant INNER JOIN restaurant_cuisine 
                on restaurant.id =restaurant_cuisine.restaurant_id
                INNER JOIN cuisine on restaurant_cuisine.cuisine_id = cuisine.id
                
                LIMIT 25`);
            }


            return res.send({ restaurants: restaurantData?.rows });
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default RestaurantController;