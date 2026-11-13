import { Router } from "express";
import * as userService from "./user.service.js";
import { response } from "./../../common/index.js"; 
import { auth } from "../../common/middleware/index.js";
import { tokenTypeEnum } from "../../common/enum/index.js";

export const userController = Router()


userController.get("/profile", auth({ tokenType: tokenTypeEnum.ACCESS }), async (req, res, next) => {
    const user= await userService.profile(req.user)
     return response({
        res,
        data: user,
        message: "user fetched"
    });
});


userController.get("/admin-profile", auth({ tokenType: tokenTypeEnum.ACCESS }), async (req, res, next) => {
  response({
    res, data: req.user, message: "user fetched"
  })
})


userController.patch("/update-user", auth(), async (req, res, next) => {
    let user = await userService.updateUser(req.user,req.body);
    response({
        res,
        data: user,
        message: "user updated in"
    });
});
