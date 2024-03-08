import {Schema , model} from "mongoose";

const paperSchema = new Schema({

     type: {type:String , enum:['A4' , 'A3']},
     reciver:{type:String, required:true},
     count:{type:Number  , required:true},
     far3:{type:String  , required:true},
     time: {type: Date, index: true},
     

}, {
    timestamps:true
})
export const paperModel = model(`Paper`, paperSchema)

// .loader {
//     border: 24px solid #FFF;
//     border-color: #FF3D00 #FF3D00 #fff #fff;
//     border-radius: 50%;
//     position: relative;
//     animation: rotate 1s linear infinite
//   }

//   .loader:before {
//       content: '';
//       position: absolute;
//       top: 50%;
//       transform: translate(-50% , -125%);
//       left: 50%;
//       width: 12px;
//       height: 12px;
//       background: #fff;
//       border-radius: 50%;
//     }
//   @keyframes rotate {
//     100%   { transform: rotate(360deg)}
//   }