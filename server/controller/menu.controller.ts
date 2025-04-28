import { StatusCodes } from "../constant/statusCodes";
import  MenuService  from "../services/menu.service"
import { type Request , type Response } from 'express';

class MenuController{
   async Create(req:Request , res:Response){
 

       const response = await MenuService.createMenu(req.body, req.file , req.userId as string);
       res.status(StatusCodes.CREATED).json({
         success: true,
         message: 'Created Successfully.',
         data: response,
       });
       
   }
   async Update(req:Request , res:Response){
 
  const menuId = req.params.menuId as string
       const response = await MenuService.updateMenu(req.body, req.file , menuId as string);
       res.status(StatusCodes.CREATED).json({
         success: true,
         message: 'Updated Successfully.',
         data: response,
       });
       
   }
 
   
  



}

export default MenuController