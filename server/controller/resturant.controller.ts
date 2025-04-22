import { StatusCodes } from "../constant/statusCodes";
import  ResturantService  from "../services/resturant.service"
import { type Request , type Response } from 'express';

class ResturantController{
   async Create(req:Request , res:Response){
 

       const response = await ResturantService.createResturant(req.body, req.file, req.userId as string);
       res.status(StatusCodes.CREATED).json({
         success: true,
         message: 'Created Successfully.',
         data: response,
       });
       
   }
   async Update(req:Request , res:Response){
      const response = await ResturantService.updateResturant(req.body , req.file , req.userId as string )
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Updated Successfully.',
        data: response,
      });
   }
   async Get(req:Request , res:Response){
      const response = await ResturantService.getResturant(req.userId as string)
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: ' all resurant',
        data: response,
      });
   }
  //  async GetRestaurantOrder(req:Request , res:Response){
  //     const response = await ResturantService.getRestaurantOrder(req.userId)
  //     res.status(StatusCodes.CREATED).json({
  //       success: true,
  //       message: ' Success.',
  //       data: response,
  //     });
  //  }
  //  async UpdareOrderStatus(req:Request , res:Response){
  //     const response = await ResturantService.updateOrderStatus(req.params ,  req.body)
  //     res.status(StatusCodes.CREATED).json({
  //       success: true,
  //       message: 'Order Status Update Successfully.',
  //       data: response,
  //     });
  //  }
  //  async SearchRestaurant(req:Request , res:Response){
  //     const response = await ResturantService.searchRestaurant(req.params ,  req.query)
  //     res.status(StatusCodes.CREATED).json({
  //       success: true,
  //       message: 'Search Successfully.',
  //       data: response,
  //     });
  //  }
  //  async getSingleRestaurant(req:Request , res:Response){
  //     const response = await ResturantService.getSingleRestaurant(req.params)
  //     res.status(StatusCodes.CREATED).json({
  //       success: true,
  //       message: 'Resturant.',
  //       data: response,
  //     });
  //  }



}

export default ResturantController