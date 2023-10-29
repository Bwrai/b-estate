import express from "express";
import mongoose from "mongoose";
import dotEnv from 'dotenv';
import userRouter from './routes/userRoutes.js'

dotEnv.config()

const app = express();
const PORT = process.env.PORT || 3000;


async function mongoConnection() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
        console.log("DATABASE CONNECTED")
    } catch (err) {
        console.error("MONGO CONNECTION FAILED", err)
    }
}
mongoConnection()

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

app.use('/api/user', userRouter)