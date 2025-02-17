import express from 'express';
import cors from 'cors';
import type { Application } from 'express';
import bodyParser from 'body-parser';
import Routes from './routes/routes';
import DbConnection from './controller/database';
import 'dotenv/config';
import path from 'path';
import cookieParser from 'cookie-parser';

class Express extends DbConnection {

    private port: number;
    private app: Application;
    private router: Routes;

    public constructor(port: number) {
        super(); //inheriting the constructor from DbConnection class
        this.dbconnection();
        this.port = port;
        this.router = new Routes();
        this.app = express();
        this.listen();

    }

    public middleware() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(this.router.getRouter());
        this.app.use('/', express.static(path.join(__dirname, 'public')));
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log("app running on port", this.port)
        })
    }

}

const app = new Express(3000);
app.middleware();