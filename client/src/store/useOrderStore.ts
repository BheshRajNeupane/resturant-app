import AxiosInstance from "@/api/axios";
import { CheckoutSessionRequest, OrderState } from "@/types/order.types";
// import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// const API_END_POINT: string = "https://food-app-yt.onrender.com/api/v1/order";
// axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(persist((set => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSession: CheckoutSessionRequest) => {
        try {
            set({ loading: true });
            const response = await AxiosInstance.post(`/checkout/create-checkout-session`, checkoutSession);
            console.log("response", response);
            window.location.href = response.data.data.url;
            set({ loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
    getOrderDetails: async () => {
        try {
            set({loading:true});
            const response = await AxiosInstance.get(`/order`);
          
            set({loading:false, orders:response.data.data});
        } catch (error) {
            set({loading:false});
        }
    }
})), {
    name: 'order-name',
    storage: createJSONStorage(() => localStorage)
}))