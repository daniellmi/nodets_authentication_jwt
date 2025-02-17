import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import path from 'path';

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
            if (token) return res.status(200).sendFile(path.join(__dirname, '../public', 'home.html'))
            next();

        } 
        catch (error) { console.log(error) }

        return res.status(401).send('unathourized');
    }
}

export default Middleware;