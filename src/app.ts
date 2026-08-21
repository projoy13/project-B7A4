import express, { type Application, type Request, type Response } from 'express';
import { notFound } from './middleware/notfound';
import { globalErrorHandler } from './middleware/global-error';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import cors from"cors"
import config  from './config';
import { authRoutes } from './modules/auth/auth.route';

const app: Application = express();
app.use(cors({
    origin:config.app_url,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(globalErrorHandler)
app.use(notFound)
app.use("/api/auth",authRoutes)
app.get("/",(req,res)=>{
    res.send('server is running')
})

// USER REGISTRATION
app.post("/api/users/register",async(req:Request,res:Response)=>{
   const {name,email,password,id}=req.body 
//    console.log(payload)
const inUserExist=await prisma.user.findUniqueOrThrow({
    where :{email}
})
if(isUserExist){
    throw new Error("user with this email already exists")
}

const hashPassword=await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round)

)
// res.status(httpStatus.CREATED).json ({message:"user registered successfully"})
   
})
export default app;