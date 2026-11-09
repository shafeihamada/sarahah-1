import express from "express";
    import configService from "./config/config.service.js";
import {errorHandler} from  "./common/middleware/errorHandler.js";
import {authController} from "./module/auth/auth.controller.js"
import crypto from "node:crypto"

const app =express();
const port = configService.port ||3000;


app.use(express.json())
app.use ("/auth",authController)


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"im good"
    });
});

app.use(errorHandler)


app.listen (port,()=>{
    console.log(`surver is running on port ${port}`);

});
