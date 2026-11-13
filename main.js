import express from "express";
    import configService from "./config/config.service.js";
import {errorHandler} from  "./common/middleware/errorHandler.js";
import {authController, userController} from "./module/index.js"
import crypto from "node:crypto"
import {dbconnect} from"./database/connection.js"

const app =express();
const port = configService.port ||3000;


app.use(express.json())
app.use ("/auth",authController)
app.use ("/user",userController)


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"im good"
    });
});

app.use(errorHandler)
await dbconnect()


app.listen (port,()=>{
    console.log(`surver is running on port ${port}`);

});
