import { Restaurant } from "../models/resturant.model"
import mongoose from "mongoose"
import HttpException from "../utils/HttpException.utils"
import { Message } from "../constant/messages"
import { Order } from "../models/order.model"
import { Menu } from "../models/menu.model"
import uploadImageOnCloudinary from "../cloudinary/imageUpload"
import  Stripe  from "stripe"
import { DotenvConfig } from "../config/env.config"
import { http } from "winston"
 
const stripe = new Stripe(DotenvConfig.STRIPE_SECRET_KEY!);


export interface MenuItem {

    // _id: string;
    name: string;
    description: string;
    price: number;
    image?: File | string | undefined;
}

 export interface RestaurantMenu extends MenuItem{
     _id: mongoose.Types.ObjectId
 }

type CheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string
    },
    restaurantId: string
}


class OrderService{

    async getOrderDetails(userId:string){
        try {
            const orders = await Order.find({ user: userId }).populate('user').populate('restaurant');
            return orders;
        } catch (error) {
            console.log(error);
            throw HttpException.internalServerError("Error while fetching orders");
        }
    
    }
                                                                                //RestaurantMenu
    private   createLineItems(checkoutSessionRequest:CheckoutSessionRequest  , menuItems:any ){
        const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
            const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);
            if (!menuItem) throw new Error(`Menu item id not found`);
    
            return {
                price_data: {
                    currency: 'NPR',
                    product_data: {
                        name: menuItem.name,
                        images: [menuItem.image],
                    },
                    unit_amount: menuItem.price * 100
                },
                quantity: cartItem.quantity,
            }
        })
      
        return lineItems;
  

    }
    async createCheckoutSession( checkoutSessionRequest:CheckoutSessionRequest ,  user:string )
    {
        try {
            console.log("checkoutSessionRequest", checkoutSessionRequest.restaurantId);
            const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menus');
            if (!restaurant) {
               throw HttpException.notFound('Restaurant not found')
            };
            const order: any = new Order({
                restaurant: restaurant._id,
                user: user,
                deliveryDetails: checkoutSessionRequest.deliveryDetails,
                cartItems: checkoutSessionRequest.cartItems,
                status: "pending"
            });
    
            // line items
            const menuItems = restaurant.menus;
            const lineItems =   this.createLineItems(checkoutSessionRequest, menuItems as any);


            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                shipping_address_collection: {
                    allowed_countries: ['GB', 'US', 'CA' ]
                },
                line_items: lineItems,
                mode: 'payment',
                success_url: `${DotenvConfig.FRONTEND_URL}/order/status`,
                cancel_url: `${DotenvConfig.FRONTEND_URL}/cart`,
                metadata: {
                    orderId: order._id.toString(),
                    images: JSON.stringify(menuItems.map((item: any) => item.image))
                }
            });


            console.log("session>>>>", session);
            if (!session.url) {
                throw HttpException.badRequest("Error while creating session");
               
            }
            await order.save();
            return session
        } catch (error) {
            console.log(error);
            throw HttpException.internalServerError("Error while creating session");
    
        }
 }



}
export default new  OrderService() 