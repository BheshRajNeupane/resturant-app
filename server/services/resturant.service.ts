import { Restaurant } from "../models/resturant.model"
import mongoose from "mongoose"
import HttpException from "../utils/HttpException.utils"
import { Message } from "../constant/messages"
import { Order } from "../models/order.model"
import { Menu } from "../models/menu.model"
 
 
 interface ResturantDetails  {
    restaurantName:string,
    city:string,
    country:string,
    deliveryTime:number,
    cuisines:string
    // Image:string

 }

 type OrderStatus = 
  | "pending"
  | "confirmed"
  | "preparing"
  | "outfordelivery"
  | "delivered";


class ResturantService{

    async createResturant({ restaurantName ,city ,country,deliveryTime,cuisines}:ResturantDetails , file:Express.Multer.File  | undefined , user : string)
    {
      try {  
       
        const userHaveResturant = await Restaurant.findOne({ user}) 
        console.log(user  ,userHaveResturant )
        if(userHaveResturant){
            throw HttpException.badRequest("Resturant is already created for you")
        }
        if (!file) {
           throw HttpException.badRequest("Resturant image is required")
        }
        // const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

        const resturant =  await Restaurant.create({
            user,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl :"test"
        });

        return resturant
}catch(err){
    throw err
}
    }
    async  updateResturant({ restaurantName ,city ,country,deliveryTime,cuisines}:ResturantDetails , file:Express.Multer.File  | undefined  , user : string){
        try {
           
            const restaurant = await Restaurant.findOne( {user} );
            if (!restaurant) {
                throw HttpException.notFound("resurant not found")
            };
            restaurant.restaurantName = restaurantName;
            restaurant.city = city;
            restaurant.country = country;
            restaurant.deliveryTime = deliveryTime;
            restaurant.cuisines = JSON.parse(cuisines);
    
            if (file) {
                // const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
                // restaurant.imageUrl = imageUrl;
            }
            await restaurant.save();
            return restaurant
        } catch (error) {
        throw error
        }
    }
    async getResturant( userId:string){
        try {
           
            const restaurant = await Restaurant.findOne({ user: userId }) //.populate('menus');

            if (!restaurant) {
                return { restaurant : []}
            };
            return   restaurant  
        } catch (error) {
            console.log(error);
            throw error
        }

        
    }
     async getRestaurantOrder( user: string){
   try{     


      const resturant = await Restaurant.findOne({user})
         if(!resturant){
            throw HttpException.notFound("resturant not found")
         }
  console.log("resturantid" ,resturant?._id , "userid" ,user )


  
  
const orders = await Order.find({restaurant:resturant?._id})//.populate('resturant').populate('user')

        //  if(!orders){
        //     throw HttpException.notFound("Order not found")


        //  }
     
  

         return orders

     }catch(err){
        throw err

     }
    }
    async updateOrderStatus( orderId:string,   { status:updateOrderStatus }: {  status:OrderStatus }  ){
     try{
        const order = await Order.findById(orderId);
        if(!order){
            throw HttpException.notFound("Order not found")
        }
        order.status = updateOrderStatus;
        await order.save();

        return order;

     }catch(err){
        throw err
     }

    }
    async searchRestaurant( searchText :string , searchQuery:string , selectedCuisines :string[]){
   const query :any = {}
     if(searchText){
        query.$or = [
            { restaurantName: { $regex: searchText, $options: 'i' } },
            { city: { $regex: searchText, $options: 'i' } },
            { country: { $regex: searchText, $options: 'i' } },
        ]
     }

     if (searchQuery) {
        query.$or = [
            { restaurantName: { $regex: searchQuery, $options: 'i' } },
            { cuisines: { $regex: searchQuery, $options: 'i' } }
        ]
    }
    if(selectedCuisines.length > 0){
        query.cuisines = {$in:selectedCuisines}
    }
    // console.log("QUERY>>" , query)
    try {
    const restaurants = await Restaurant.find(query);
    return restaurants
} catch (error) {
    throw error
}
    }
 async getSingleRestaurant(id:string ){
        try{ 
        const restaurant = await Restaurant.findById(id)
        // .populate({
        //     path:'menus',
        //     options:{createdAt:-1}
        // });
        if(!restaurant){
         throw HttpException.notFound("resturant not found")
        };
        console.log(restaurant)
        return restaurant
       
    }catch(err){
        throw err
    }
}


}
export default new ResturantService() 