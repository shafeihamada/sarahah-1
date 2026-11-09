import { Router } from "express";
import * as us from "./user.service.js";
import { response } from "./../../common/index.js"; 
import { auth } from "../../common/middleware/index.js";

export const userController = Router()


userController.get("/profile", auth({ tokenType: tokenTypeEnum.ACCESS }), async (req, res, next) => {
    response({
        res,
        data: req.user,
        message: "user fetched"
    });
});


userController.get("/admin-profile", auth({ tokenType: tokenTypeEnum.ACCESS }), async (req, res, next) => {
  response({
    res, data: req.user, message: "user fetched"
  })
})


userController.patch("/update-user", auth(), async (req, res, next) => {
    let user = await us.updateUser(req.user);
    response({
        res,
        data: user,
        message: "user updated in"
    });
});