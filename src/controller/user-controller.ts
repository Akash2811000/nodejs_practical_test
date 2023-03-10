import pool from '../dbconfig/db.connection';
import express, { Request, Response } from 'express';
import jwt, { TokenExpiredError } from "jsonwebtoken";
class UserController {

    public async addUser(req: Request, res: Response, data: any, token: any) {
        try {
            const client = await pool.connect();
            const id = data.id;
            const email = data.email;
            const sql = `INSERT INTO "user"( id,email, firebase_uid)
                VALUES ('${id}','${email}','${id}');`;
            const { rows } = await client.query(sql);
            const cuisine = rows;
            client.release();
            res.cookie(`token`, token);

            return res.status(201).send({
                message: "User added successfully!",
                body: {
                    data
                },
            });
        } catch (error: any) {
            if (error.code == 23505) {
                const client = await pool.connect();
                const email = (data.email);
                console.log('id', email)
                const response: any = await client.query('SELECT * FROM public.user WHERE email = $1', [email]);
                const expirationDate = new Date();
                expirationDate.setHours(new Date().getHours() + 1);
                const payload = {
                    email: email,
                    id: response.rows[0].id,
                    expirationDate
                }

                const token = jwt.sign(payload, 'jwt-sec');
                res.cookie(`token`, token);
                return res.status(200).send(response.rows);


            } else {
                res.status(400).send(error);
            }

        }
    }
}

export default UserController;