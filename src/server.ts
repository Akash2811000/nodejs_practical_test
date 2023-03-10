import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import "express-async-errors";
import pool from './dbconfig/db.connection';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlware/error-handler';
import { emailSentUser } from './routes/email-link-send';
import { emailVerify } from './routes/email-verify';
import appRoutes from './routes/get-cuisin';
import cookieParser from 'cookie-parser';
import { setprefRoute } from './routes/set-user-pref';
import { restaurantRoute } from './routes/get-restaurant';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
    }

    private dbConnect() {
        pool.connect(function (err: any, client, done) {
            if (err) throw new Error(err);
            console.log('Connected');
        });
    }

    private routerConfig() {
        console.log('ooo');
        this.app.use(cookieParser());
        this.app.use('/app', appRoutes);
        this.app.use('/app', emailSentUser);
        this.app.use('/app', emailVerify);
        this.app.use('/app', setprefRoute);
        this.app.use('/app', restaurantRoute);
        this.app.use(errorHandler);
        this.app.all('*', async () => {
            throw new NotFoundError();
        });
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;


