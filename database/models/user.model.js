import mongoose  from "mongoose";
import {GenderEnum, RoleEnum} from "./../../common/enum/index.js"
//import { RoleEnum } from "./../../common/enum/role.enum.js";

const userschema = new mongoose.Schema({
    firstname:{
         type:String,
         maxLength: 50,
         minLength:2,
         required:true
    },
    lastname:{
         type:String,
         maxLength: 50,
         minLength:2,
         required:true

    },
    email:{
         type:String,
         maxLength: 50,
         minLength:2,
         required:true,
         unique:true
    },
    gender:{
type:Number,
enum:  Object.values(GenderEnum),
default: GenderEnum.male
    },
    password:{
        type:String,
        required:true
    },
    phone:{type:String},

    role:{
        type:Number,
        enum:Object.values(RoleEnum),
        default:RoleEnum.user
    }

},



    {
        timestamps : true,
        strict: true,
        strictQuery:true,
        toJSON:{
            virtuals:true
        },
        autoIndex:true 

    }
)

userschema.virtual("username").set(function(value){
    let [firstname , lastname] = value.split("")
    this.firstname = firstname
    this.lastname = lastname
}).get(function(){
    return`${this.firstname} ${this.lastname}`
})


export const userModel = mongoose.model("User", userschema)