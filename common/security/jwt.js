import jwt from "jsonwebtoken";
import configService from "./../../config/config.service.js";
import { RoleEnum } from "../enum/index.js";


export const createLoginTokens = (payload = {}, options = {}, role=RoleEnum.user)=>{
    let accessToken = createToken({
        role,
        payload,options,secret:configService.JWT_ACCESS_SECRET
    })

     let refreshTokenToken = createToken({
        role,
        payload,options,secret:configService.JWT_REFRESH_SECRET
    })

}

export const createToken = ({ payload = {}, options = {}, secret = configService.JWT_SECRET }) => {
    let accessToken = jwt.sign(payload,secret,{expiresIn:60,
    ...options
})

    let refreshToken = jwt.sign(payload,secret,{expiresIn:"7d",
    ...options
})
return{
    accessToken,
     refreshToken 

}
}



export const verifyToken = ({ token, secret = configService.JWT_SECRET }) => {
    return jwt.verify(token, secret)
}