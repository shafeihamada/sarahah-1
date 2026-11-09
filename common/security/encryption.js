import crypto from "node:crypto"
import configService from "../../config/config.service.js"

let { ENC_IV_LENGTH, ENC_KEY, ENC_ALGO } = configService
let key = Buffer.from(ENC_KEY)

export const encryption = async (plaintext) => {
  const ivLength = Number(ENC_IV_LENGTH) || 16 
  const iv = crypto.randomBytes(ivLength)
  
  let cipherIv = crypto.createCipheriv(ENC_ALGO, key, iv)
  let result = cipherIv.update(plaintext, "utf-8", "hex")
  result += cipherIv.final("hex")
  return `${iv.toString("hex")}:${result}`
}

export const decryption = (cipherText) => {
  
  let [hexIv, encrypted] = cipherText.split(":")
  const iv = Buffer.from(hexIv, "hex")
  let decipherIv = crypto.createDecipheriv(ENC_ALGO, key, iv)
  let result = decipherIv.update(encrypted, "hex", "utf-8")
  result += decipherIv.final("utf-8")
  return result
}