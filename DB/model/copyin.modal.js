import {Schema , model} from "mongoose";

const copyInSchema = new Schema({

     storage: {type:String , enum:['USB' , 'CD','HARD'],required:true},
     far3:{type:String, required:true},
     entityOut:{type:String  , required:true},
     subject:{type:String  , required:true},
     reciver:{type:String  , required:true},
     writer:{type:String  , required:true},
    //  copyOrder:{type:String  , required:true},
    //  password:{type:String  , required:true},
        
}, {
    timestamps:true
})
export const copyinModal = model(`Incopy`, copyInSchema)