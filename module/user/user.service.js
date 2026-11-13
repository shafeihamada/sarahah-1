import jwt from "jsonwebtoken";
import { userModel } from "../../database/models/index.js";
import {verifyToken} from"../../common/security/index.js"
import configService from "../../config/config.service.js";

export const profile = async (user) => {
    
    
    return user;
}

export const updateUser = async (user,data) => {
    const updateUser=await userModel.findByIdAndUpdate(
        user._id,
        data,
        {new:true}
    )
    
    
    return updateUser;
}