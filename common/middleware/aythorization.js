import { RoleEnum } from "../enum/role.enum.js"
import { UnauthorizedException } from "../utils/exceptions.js"

export const authorization = (acceptedRoles = []) => {
  return (req, res, next) => {
    let role = req.user.role
    if(role== RoleEnum.admin) next()
    if(!acceptedRoles.includes(role)) {
      UnauthorizedException()
    }
    next()
  }
}