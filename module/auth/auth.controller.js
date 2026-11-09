import {Router} from "express"
import * as as from "./auth.service.js"

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
    let user = await await as.login(req.body); // تذكر إزالة await الزائدة إذا كانت تسبب مشكلة
    response({
        res, 
        data: user, 
        message: "user logged in"
    });
});

authController.post("/rotate-token", auth({ tokenType: tokenTypeEnum.REFRESH }), (req, res, next) => {
    let tokens = as.rotateToken(req.user);
    response({
        res, 
        data: tokens, 
        message: "token rotated"
    });
});
