import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config({
    path: "./.env"
});


const startServer = async () => {
    try{
        await connectDB();

        app.on("error", (error) => {
           console.log("Error", error);
           throw error;
        });

        app.listen(process.env.PORT || 8000, () =>{
            console.log(`server is running on port : ${process.env.PORT}`);
        });
    } catch(error){
        console.log("MongoDB Connection Failed !!", error);
        process.exit(1);
    }

}

startServer();