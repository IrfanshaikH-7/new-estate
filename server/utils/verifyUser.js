import { errorHandler } from './error.js'
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return next(errorHandler(401, "Unauthorize"))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err){
            return next(errorHandler(403, "Forbidden"));
        }

        req.user = decodedUser;
        next();
    })

}