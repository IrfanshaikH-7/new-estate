import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js'
import AuthRouter from './routes/auth.route.js'


const app = express()
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Successfully connected to MONGODB");
}).catch((err) => {
    console.log(err)
});

app.listen(3000, () => {
    console.log('server is running on port 3000!!')
})

app.use('/api/user', userRouter)
app.use('/api/auth', AuthRouter)