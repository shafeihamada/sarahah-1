
import { userModel } from "/index.js"
import { BadRequestException } from "../utils/exceptions.js"

export const auth = async (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        BadRequestException("token npt provided")
    }
    let { sub } = verifyToken({
        token
    })
    let user = await userModel.findById(sub)
    next()
}