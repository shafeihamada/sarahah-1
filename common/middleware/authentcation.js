
import { userModel } from "../../database/models/index.js"
import { BadRequestException } from "../utils/exceptions.js"
import{verifyToken} from "../security/index.js"
import { tokenTypeEnum } from "../enum/index.js"

export const auth =({tokenType=tokenTypeEnum.ACCESS}={})=> { return async (req, res, next)=>{ 
    let token = req.headers.authorization
    if (!token) {
         BadRequestException("token not provided")
    }
    let decoded = verifyToken({
    token,
    tokenType
});
req.user = await userModel.findById(decoded.sub);
req.decoded = decoded;
next()

}}