import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { CartState } from "@/types/cart.types";
import { MenuItem } from "@/types/resturant.types";



export const useCartStore = create<CartState>()(persist((set)=>({
    cart:[],
    addToCart: async (item:MenuItem)=>{
        set((state) => {
            const exisitingItem = state.cart.find((cartItem) => cartItem._id === item._id);
            if (exisitingItem) {
                return {
                    cart: state?.cart.map((cartItem) => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    )
                };
            } else {
                // add cart
                return {
                    cart: [...state.cart, { ...item, quantity: 1 }]
                }
            }
        })

       
    },
    clearCart:()=>{ set({cart:[]})},
    removeFromTheCart:(id:string)=>{
    //   set((state)=>{
    //      return  { cart: state.cart.filter((cartItme)=> cartItme._id !== id) }
         
    //   })
      set((state)=>({
          cart: state.cart.filter((cartItme)=> cartItme._id !== id) 
         
      }))
    },
    incrementQuantity:(id:string)=>{ 
    
        set((state) => ({
            cart: state.cart.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
        }))
    },
    decrementQuantity:(id:string)=>{
     
        set((state) => ({
            cart: state.cart.map((item) => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
        }))
    },

}) , 
{
    name: 'cart-name',
    storage: createJSONStorage(() => localStorage)
}
))