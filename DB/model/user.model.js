import {Schema , model} from "mongoose";
import * as userRoles from '../../utils/userRoles.js'
const userSchema = new Schema({
     userName:{type:String,required:true},
     email :{type:String,unique:true,required:true},
     password:{type:String,required:true},
     avatar:{type:String,default:"upload/profile/default.png"},
    role:{
        type:String,
        enum:[userRoles.USER,userRoles.ADMIN],
        default:userRoles.USER
    },
    //  token:{type:String},
    deg:{type:String,required:true},

        
}, {
    timestamps:true
})
export const userModel = model(`User`, userSchema)
 