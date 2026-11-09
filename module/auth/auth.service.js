import {exceptions} from "../../common/index.js"
import {encryption } from "../../commonlsecurity/encryption.js"
import configService from "../../config/config.service.js"
import{usermodel} from "../../database/models/index.js"
import jwt from "jsonwebtoken"

export const signup = async (data) => {
  let exists = await userModel.findOne({ email: data.email })
  if (exists) exceptions.ConflictException("user already exists")
  data.password = await myHash({ plainText: data.password, lib: HashEnum.argon })
  data.phone = encryption(data.phone)
  let user = await userModel.create(data)
  return user
}

export const login = async ({ email, password }) => {
  let user = await userModel.findOne({ email })
  if (!user) exceptions.NotFoundException("user not found")
  let matchPassword = await myCompare({ plainText: password, encrypted: user.password, lib: HashEnum.argon })
  if (!matchPassword) exceptions.NotFoundException("user not found")

  let tokens = createTokens({
    options: { subject: user.id, issuer: "ali", audience: ["admin", "user"] }
  })

  return tokens
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




