import {Schema , model} from "mongoose";

const far3Schema = new Schema({
     far3Name:{type:String, required:true},
     
}, {
    timestamps:true
})
export const far3Model = model(`Far3`, far3Schema)
