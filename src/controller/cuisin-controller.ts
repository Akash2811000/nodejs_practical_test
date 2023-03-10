import pool from '../dbconfig/db.connection';
import express, { Request, Response } from 'express';
class CuisineController {

    public async get(req: Request, res: Response) {
        try {
            const client = await pool.connect();
            const sql = "SELECT * FROM cuisine";
            const { rows } = await client.query(sql);
            const cuisine = rows;
            client.release();

            res.send(cuisine);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default CuisineController;