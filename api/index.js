import express from "express";
import mongoose from "mongoose";
import dotEnv from 'dotenv';
dotEnv.config()

const app = express();
const PORT = process.env.PORT || 3000;


async function mongoConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DATABASE CONNECTED")
    } catch (err) {
        console.error("MONGO CONNECTION FAILED", err)
    }
}
mongoConnection()

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})