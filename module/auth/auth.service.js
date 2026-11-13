import {exceptions} from "../../common/index.js"
import {encryption } from "../../common/security/encryption.js"
import configService from "../../config/config.service.js"
import { myHash,myCompare,createLoginTokens } from "../../common/security/index.js";
import { HashEnum } from "../../common/enum/index.js";
import{userModel} from "../../database/models/index.js"
import jwt from "jsonwebtoken"

export const signup = async (data) => {
  let exists = await userModel.findOne({ email: data.email })
  if (exists) exceptions.ConflictException("user already exists")
  data.password = await myHash({ plaintext: data.password, lib: HashEnum.argon })
  data.phone = await encryption(data.phone)
  let user = await userModel.create(data)
  return user
}

export const login = async ({ email, password }) => {
  let user = await userModel.findOne({ email })
  if (!user) exceptions.NotFoundException("user not found")
  let matchPassword = await myCompare({ plaintext: password, encrypted: user.password, lib: HashEnum.argon })
  if (!matchPassword) exceptions.NotFoundException("user not found")

 let tokens = createLoginTokens({
    payload: { sub: user._id },
    role: user.role
});
return tokens;
}

export const rotateToken = (user, payload) => {
  let accessIAT = payload.iat * 1000
  let accessExpIn = configService.JWT_ACCESS_EXP * 1000
  let accessExpAt = accessExpIn + accessIAT
  let currTime = Date.now()
  
  if (currTime < accessExpAt) {
    ConflictException("access token still valid")
  }
  
  let { accessToken } = createTokens({
    options: { subject: user.id, issuer: "ali", audience: ["admin", "user"] }
  })

  return {
    accessExpAt,
    currTime
  }
}




