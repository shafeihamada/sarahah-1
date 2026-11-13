import {Router} from "express"
import * as as from "./auth.service.js"
import {auth, tokenTypeEnum,response} from "../../common/index.js"
const authController = Router()

 authController.post("/signup", async (req, res, next) => {
    let user = await as.signup(req.body);
    response({
        res, 
        data: user, 
        status: 201, 
        message: "user created"
    });
});

authController.post("/login", async (req, res, next) => {
    let user =  await as.login(req.body);
    response({
        res, 
        data: user, 
        message: "user logged in"
    });
});

authController.post("/rotate-token", auth({ tokenType: tokenTypeEnum.REFRESH }),async (req, res, next) => {
    let result = await as.rotateToken(req.user,req.decoded);
    response({
        res, 
        data: tokens, 
        message: "token rotated"
    });
});

export{authController}