import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import  jwt  from 'jsonwebtoken';

export const signup = async(req, res, next) => {

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return res.status(200).json({ message: "Sign up successful" })
        
    } catch (error) {
        next(error)
    }
}

export const signin = async(req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email });
        if (!validUser){
            return next(errorHandler(404, "User not found"));
        }
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if(!isValidPassword){
            return next(errorHandler(401, "Wrong credentials"))
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc; //destructureing everything except password for security reasons
        res.cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }

}