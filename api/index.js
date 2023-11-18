import express from "express";
import mongoose from "mongoose";
import dotEnv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoute.js';
import cookieParser from "cookie-parser";
import listingRouter from './routes/listingRoute.js';

dotEnv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());
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

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter)

// Error Handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})