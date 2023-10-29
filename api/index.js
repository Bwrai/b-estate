import express from "express";
import mongoose from "mongoose";
import dotEnv from 'dotenv';
dotEnv.config()

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DATABASE CONNECTED")
    })
    .catch((err) => {
        console.error("MONGO CONNECTION FAILED:",err);
    })
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})