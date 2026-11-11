import { catchAsync } from "../../utils/catch-async";
import type {Request,Response} from "express";
import { sendResponse } from "../../utils/send-response";
import { providerService } from "./provider.service";
const  getDashboardStatus=catchAsync(async(req:Request,res:Response)=>{
    const providerId=req.user!.id;
    const result=await providerService.getDashboardStatus(providerId);
       sendResponse(res,{
        success:true,
        message:"provider dashboard retrived successfully",
        data:result
       })
}
)
export const providerController={
    getDashboardStatus
}