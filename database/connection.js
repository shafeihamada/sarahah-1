import mongoose  from "mongoose";
import configService from "./config/config.service.js";

export const dbconnect = async()=>{

    try{await mongoose.connect(configService.DB-URI);
        await mongoose.syncIndexes()
        console.log ("DB connected");
    }
    catch(e){
        console.log (e.message);
        process.exist(1);
    }
};