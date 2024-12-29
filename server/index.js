import express from "express";
// import dotenv from "dotenv";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(cors({
    origin: "http://localhost:5173", credentials: true, 
    }));
app.use(express.json());
app.use(cookieParser());

//middleware for error handling 

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        message:message,
        status: status,
    });
})







const Connect = ()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        throw err;
    })
}

//to use and parse external jsons


app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/auth",authRoutes);






app.listen(8080,()=>{
    Connect();
    console.log("server running on 8080");
})