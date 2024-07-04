import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import connectToMongoDB from "./db/connectMongoDB.js";

import { app, server } from './socket/socket.js'

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server is running in the port ${PORT}`)
})