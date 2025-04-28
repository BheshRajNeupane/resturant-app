import { Restaurant } from "../models/resturant.model"
import mongoose from "mongoose"
import HttpException from "../utils/HttpException.utils"
import { Message } from "../constant/messages"
import { Order } from "../models/order.model"
import { Menu } from "../models/menu.model"
 
export type MenuItem = {

    // _id: string;
    name: string;
    description: string;
    price: number;
    image?: File | string | undefined;
}


class MenuService{

    async createMenu({ name ,description ,price}:MenuItem , file:Express.Multer.File  | undefined , user:string )
    {
      try {  
        if(!file){
            throw HttpException.badRequest("Menu image is required.")
        }
        // const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const menu :any = await Menu.create({
            name , 
            description,
            price,
            image:"test"
        });
        const restaurant = await Restaurant.findOne({ user});
        if(restaurant){
            (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
            await restaurant.save();
        }
           

        return menu
}catch(err){
    throw err
}
 }

   async  updateMenu({name ,description ,price }:MenuItem , file:Express.Multer.File  | undefined  , menuId : string){
        try {
           const menu =  await  Menu.findById(menuId)

           if(!menu){
            throw HttpException.notFound("Please add menu first")
           }
           if(name) menu.name = name;
           if(description) menu.description = description;
           if(price) menu.price = price;
   
           if(file){
            //    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            //    menu.image = imageUrl;
           }
         
            return menu
        } catch (error) {
        throw error
        }



}

}
export default new MenuService() 