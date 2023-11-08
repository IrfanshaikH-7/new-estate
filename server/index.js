import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import userRouter from './routes/user.route.js'
import AuthRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'


const app = express()

app.use(express.json());
app.use(cookieParser());

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Successfully connected to MONGODB");
}).catch((err) => {
    console.log(err)
});

app.listen(3000, () => {
    console.log('server is running on port 3000!!')
})

app.get("/",(req, res)=> {
    res.send("hello world!!")
})
app.use('/api/user', userRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/listing', listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internall server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: message
    })
})