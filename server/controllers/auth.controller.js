import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';

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