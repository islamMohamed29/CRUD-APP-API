import dotenv from 'dotenv'
dotenv.config()

import express from "express"
import connectDB from "./DB/connection.js"
import * as indexRouter from './modules/index.router.js'
import * as httpStatusText from './utils/httpStatusText.js'
import path from 'path';
import cors from 'cors'
import {fileURLToPath} from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(cors())
const port = 3000
const baseUrl = process.env.BASEURL
app.use(express.json())
// app.use(`${baseUrl}/upload`,express.static('./upload'))
app.use(`${baseUrl}/upload`, express.static(path.join(__dirname, './upload')))
// console.log(__dirname)



app.use(`${baseUrl}/mokatbat`,indexRouter.mokatbatRouter)
app.use(`${baseUrl}/paper`,indexRouter.paperRouter)
app.use(`${baseUrl}/copy`,indexRouter.copyRouter)
app.use(`${baseUrl}/auth`,indexRouter.authRouter)
app.use(`${baseUrl}/gear`,indexRouter.gearRouter)

app.all('*', (req,res)=> {
    res.json({message: 'In-valid Routing'})
})
app.use( (error,req,res,next)=> {
res.status(error.statusCode || 500).json({
    status:error.statusText|| httpStatusText.ERROR,
    message: error.message,
    code:error.statusCode || 500,
    data:null
})
})

connectDB()
app.listen(port, ()=> console.log(`server running on port >>>> ${port}`))
