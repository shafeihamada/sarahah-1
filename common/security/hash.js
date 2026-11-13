import { hash, compare , genSalt } from "bcrypt";
import configservice from "../../config/config.service.js";
import {HashEnum} from "../index.js"
import argon2 from "argon2"

export const myHash = async ({ plaintext ,minor ="b" , lib =HashEnum.bcrypt}) => {

switch (lib) {
    case HashEnum.bcrypt:
        
    let salt = await genSalt(configservice.SALT , minor) 
  let result = await hash(plaintext, salt)
  return result 
        
        break;

    case HashEnum.argon:
    return await argon2.hash(plaintext)
        break;
}



};

export const myCompare = async ({plaintext, encrypted, lib= HashEnum.bcrypt}) => {
  switch (lib) {
    case HashEnum.bcrypt:
return await compare(plaintext , encrypted)
        
        break;

    case HashEnum.argon:
    return await argon2.verify(encrypted, plaintext)
        break;
}
};