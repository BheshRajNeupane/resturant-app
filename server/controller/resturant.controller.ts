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
    console.log("req.body" , req.body)
      console.log("req.file" , req.file)
      const response = await ResturantService.updateResturant(req.body , req.file , req.userId as string )
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Updated Successfully.',
        data: response,
      });
   }
   async Get(req:Request , res:Response){
      const response = await ResturantService.getResturant(req.userId as string)
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: ' all resurant',
        data: response,
      });
   }
   async GetRestaurantOrder(req:Request , res:Response){
      const response = await ResturantService.getRestaurantOrder(req.userId as string)
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: ' Order list.',
        data: response,
      });
   }
   async UpdareOrderStatus(req:Request , res:Response){
    const orderId =  req.params.orderId as string
      const response = await ResturantService.updateOrderStatus(orderId,  req.body)
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Order Status Update Successfully.',
        data: response,
      });
   }
   async SearchRestaurant(req:Request , res:Response){
    const searchText = req.params.searchText as string || "";
    const searchQuery = req.query.searchQuery as string || "";
 
    const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
      const response = await ResturantService.searchRestaurant(searchText,  searchQuery , selectedCuisines)
      res.status(StatusCodes.SUCCESS).json({
        success: true,
        message: 'Search Successfully.',
        data: response,
      });
   }
   async getSingleRestaurant(req:Request , res:Response){
    
    const resturantId = req.params.id
      const response = await ResturantService.getSingleRestaurant(resturantId)
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Resturant.',
        data: response,
      });
   }
  



}

export default ResturantController