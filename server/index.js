import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.get('/', () => {
    console.log('getting /  ')
})