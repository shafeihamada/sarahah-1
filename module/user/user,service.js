import jwt from "jsonwebtoken";
import { userModel } from "./../../database/models/index.js";
import {verifyToken} from"../../common/security/index.js"
import configService from "./../../config/config.service.js";

export const profile = async (token) => {
    
    let { sub } = verifyToken({token});
    let user = await userModel.findById(sub);
    
    return user;
}

export const updateUser = async (token,data) => {
    
    let { sub } = verifyToken({token});
    let user = await userModel.findByIdAndUpdate(sub,data);
    
    return user;
}