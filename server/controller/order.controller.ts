import { StatusCodes } from "../constant/statusCodes";
import  MenuService  from "../services/menu.service"
import { type Request , type Response } from 'express';
import orderService from "../services/order.service";

class OrderController{
   async CreateSession(req:Request , res:Response){
 

       const response = await orderService.createCheckoutSession(req.body,  req.userId as string);
       res.status(StatusCodes.CREATED).json({
         success: true,
         message: 'Created Successfully.',
         data: response,
       });
       
   }
   async Get(req:Request , res:Response){
 

       const response = await orderService.getOrderDetails(req.userId as string);
       res.status(200).json({
         success: true,
         message: ' Successfully.',
         data: response,
       });
       
   }
   async WebHook(req:Request , res:Response){
     const response = await orderService.stripeWebhook(req.headers['signature'] , req.body);
       res.status(200).json({
         success: true,
         message: ' Successfully.',
         data: response,
       });

   }
 
   
  



}

export default OrderController