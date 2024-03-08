import {Schema , model} from "mongoose";

const sarfPaperSchema = new Schema({
    numberSarf:{type:Number, required:true},
     
}, {
    timestamps:true
})
export const sarfPaperModel = model(`PaperSarf`, sarfPaperSchema)
