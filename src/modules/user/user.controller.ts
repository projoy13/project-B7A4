import prisma from "../../lib/prisma";
import { catchAsync } from "../../utils/catch-async";
import type{Request,Response} from "express"
import { sendResponse } from "../../utils/send-response";


export const getUsers=catchAsync(async(res:Request,res:Response)=>{

    const user=await prisma.user.findMany({
     where:{
   isAvailable:true
     },
        orderBy:{
createdAt:"desc"
        }
    })
    sendResponse(res,{message:"users retrived successfully",data:{user}})
})