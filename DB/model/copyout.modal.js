import {Schema , model} from "mongoose";

const copyOutSchema = new Schema({

     storage: {type:String , enum:['USB' , 'CD','HARD'],required:true},
     entityIn:{type:String, required:true},
     entityOut:{type:String  , required:true},
     subject:{type:String  , required:true},
     reciver:{type:String  , required:true},
     sendar:{type:String  , required:true},
     owner:{type:String  , required:true},
     password:{type:String  , required:true},
    
        
}, {
    timestamps:true
})
export const copyoutModal = model(`Outcopy`, copyOutSchema)