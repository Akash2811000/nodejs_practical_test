import pool from '../dbconfig/db.connection';
import express, { Request, Response } from 'express';
class PrefController {

    public async addPref(req: any, res: Response) {
        try {
            const client = await pool.connect();
            const body = req.body;
            const userId: any = req.currentUser.id;
            const todayDate = new Date();
            const month = todayDate.getMonth();
            const day = todayDate.getDate();
            const year = todayDate.getFullYear();
            let date_created = year + "-" + month + "-" + day;
            console.log("body", body);
            if (body.cousinId != undefined) {
                const response = await client
                    .query(`SELECT * FROM public.user_cuisine_preference WHERE "user_id" = ${userId} AND "cuisine_id"= ${body.cousinId}`);
                console.log("responsw", response.rows);
                if (response.rows.length > 0) {
                    return res.status(400).send({
                        "errors": [
                            {
                                "message": "Record alredy inserted of this cuisine_id "
                            }
                        ]
                    })
                }

                const sql = `INSERT INTO "user_cuisine_preference"( user_id, cuisine_id,date_created)
            VALUES ('${userId}','${body.cousinId}','${date_created}');`;
                await client.query(sql);
                client.release();

            }
            if (body.price_range != undefined) {
                const response = await client
                    .query(`SELECT * FROM public.user_price_preference WHERE "user_id" = ${userId} AND "price_range"= ${body.price_range}`);
                console.log("responsw price", response.rows);
                if (response.rows.length > 0) {
                    return res.status(400).send({
                        "errors": [
                            {
                                "message": "Record alredy inserted of this price "
                            }
                        ]
                    })
                }

                const sql = `INSERT INTO "user_price_preference"( user_id, price_range,date_created)
        VALUES ('${userId}','${body.price_range}','${date_created}');`;
                await client.query(sql);
                client.release();
            }
            return res.send("Data added");



        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default PrefController;