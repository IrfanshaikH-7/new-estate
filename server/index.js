import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js'
import AuthRouter from './routes/auth.route.js'


const app = express()

app.use(express.json())
dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Successfully connected to MONGODB");
}).catch((err) => {
    console.log(err)
});

app.listen(3000, () => {
    console.log('server is running on port 3000!!')
})

app.use('/api/user', userRouter);
app.use('/api/auth', AuthRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internall server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: message
    })
})