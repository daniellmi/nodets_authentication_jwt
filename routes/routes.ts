import express, { NextFunction, Request, Response } from 'express';
import User from '../connection/dbcontroller';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path'

class Routes {

    private router: express.Router;

    public constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes(): void {

        this.router.post('/api/user', async (req: Request, res: Response) => {
            const { email, password, username, telephone } = req.body;

            try {
                const userExists = await User.findOne({ email: email });

                if (!userExists) {
                    let user = new User({
                        email: email,
                        password: bcrypt.hashSync(password, 10),
                        username: username,
                        telephone: telephone
                    });
                    await user.save();
                    return res.status(201).send("user saved succesfully");
                }

                else
                    return res.status(409).send("user already exists");
            }
            catch (error) {
                console.log(error);

            }
        })

        this.router.post('/api/login', async (req: Request, res: Response) => {
            const { email, password } = req.body;

            try {
                const userWasFound = await User.findOne({ email: email });
                if (!userWasFound) return res.status(404).send("user not found")

                const passwordWasFound = bcrypt.compareSync(password, userWasFound.password);
                if (!passwordWasFound) return res.status(400).send("password doesn't match");

                let token = jwt.sign({ email: userWasFound.email },
                    process.env.SECRET_TOKEN as string, { expiresIn: '2h' })

                res.cookie('authorization-token', token, {
                    httpOnly: true,
                    maxAge: 3600000,
                })

                return res.status(200).send('user logged succesfully');

            }
            catch (error) {
                console.log(error);
            }

        })
        
        this.router.get('/home', Middleware.authMiddleware);
        this.router.get('/home/*', Middleware.authMiddleware);
    }

    public getRouter(): express.Router {
        return this.router;
    }

}
class Middleware {
    //method static to take the need of a class instance
    static authMiddleware(req: Request, res: Response, next: NextFunction): any {
        const COOKIE_TOKEN = req.headers.cookie?.replace("authorization-token=", "");

        if (!COOKIE_TOKEN) {
            return res.status(301).redirect("/");
        }
        try {
            const token = jwt.verify(COOKIE_TOKEN, process.env.SECRET_TOKEN as string);
            console.log(token);
            if (token) return res.status(200).sendFile(path.join(__dirname, '../client', 'home.html'))
            next();

        } catch (error) {

            console.log(error);

        }
        return res.status(401).send('unathourized');
    }
}

export default Routes;


