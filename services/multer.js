import multer from 'multer'
import{nanoid} from 'nanoid'
import path from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const multerValidation = {
    image: ['image/png','image/jpeg'],
    pdf: ['application/pdf']
}
export const HME = (error,req,res,next)=> {
    if (error) {
        res.status(400).json({message:'Multer Error',error})
    } else {
        next()
    }
}
export function myMulter(customPath,customValidation){
    if(!customPath) {
        customPath = 'عام'
    }
    if(!customValidation) {
        customValidation = multerValidation.image
    }
    const fullPath = path.join(__dirname,`../upload/${customPath}`)
if(!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath,{recursive:true})
}
    const storage = multer.diskStorage({
        destination: function(req,file,cb) {
            cb(null, `upload/${customPath}`)
        } ,
        filename:function(req,file,cb) {
            cb(null,  nanoid() + '_' + file.originalname) //originalname = name photo + extention
        }
    })
    const fileFilter = function (req,file,cb) {
        if(customValidation.includes(file.mimetype)) {
            return cb(null,true)
        } else {
            return cb(AppError.create('file must be an image' , 400),false)
        }
    }
    const upload = multer({dest:'upload',fileFilter,storage})
    return upload
}