import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import AxiosInstance from '@/api/axios';
import encryptDecrypt from '@/utils/encryptDecrypt';
import { RestaurantState, MenuItem } from '@/types/resturant.types';
import { Orders } from '@/types/order.types';


export const useResturantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
         
          console.log("formdata" , formData)
          const response = await AxiosInstance.post('/restaurant/create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
         
          if (response.data.success) {
            // console.log("reD" ,response.data )
            set({ loading: false, restaurant: response.data.data });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          console.log( "res:",error.response.data.message)
          toast.error(error?.response?.data?.message || 'Something went wrong');
        } 
      },

      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
         
          console.log("formdata" , formData)
          const response = await AxiosInstance.patch('/restaurant/update', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
         
          if (response.data.success) {
            set({ loading: false , restaurant:response.data.data });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({loading:false})
          console.log( "res:",error.response)
          toast.error(error?.response?.data?.message || 'Something went wrong');
        } 
      },
      getRestaurant: async () => {
        try {
            set({ loading: true });
            const response = await AxiosInstance.get('/restaurant');
            if (response.data.success) {
        
                set({ loading: false, restaurant: response.data.data });
            }
        } catch (error: any) {
            if (error.response.status === 404) {
                set({ restaurant: null });
            }
            set({ loading: false });
        }
    },


      searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
        try{
          set({ loading:true})
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));
          const response = await AxiosInstance.get(`/search/${searchText}?${params.toString()}`)
          if(response.data.success){
            set({ loading:false})
            set({ loading: false, searchedRestaurant: response.data });
          }

        }catch(err){
          set({ loading: false });
        }
      },

      addMenuToRestaurant: (menu: MenuItem) => {
     try {
      set({loading:true})
     
      
     } catch (error) {
      
     }
      },

      updateMenuToRestaurant: (menu: MenuItem) => {
        // const current = get().restaurant;
        // if (current) {
        //   const updated = {
        //     ...current,
        //     menu: current.menu.map((m) => (m.id === menu.id ? menu : m)),
        //   };
        //   set({ restaurant: updated });
        // }
      },
    //FILTER
      setAppliedFilter: (value: string) => {
       set((state)=>{
        const isAlreadyApplied = state.appliedFilter.includes(value);
                                                                                             
        const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value];
        return { appliedFilter: updatedFilter }


       })
      },

      resetAppliedFilter: () => {
        set({ appliedFilter: [] })
      },

    getSingleRestaurant: async (restaurantId: string) => {
        try {
            const response = await AxiosInstance.get(`/restaurant/${restaurantId}`);
            if (response.data.success) {
              console.log(response.data)
                set({ singleRestaurant: response.data.data })
            }
        } catch (error) { }
    },

      getRestaurantOrders: async () => {
        try {
        
          const response = await AxiosInstance.get(`/restaurant/admin/orders`);
          console.log("getRestaurantOrders" , response.data.data)
          if (response.data.success) {
              set({ restaurantOrder: response.data.data });
          }
      } catch (error) {
          console.log(error);
      }
      },

      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const response = await AxiosInstance.put(`order/${orderId}/status`  , { status }

          );
          if (response.data.success) {
              const updatedOrder = get().restaurantOrder.map((order: Orders) => {
                  return order._id === orderId ? { ...order, status: response.data.data.status } : order;
              })
              set({ restaurantOrder: updatedOrder });
              console.log("resturandtOrder" ,response )
              toast.success(response.data.message);
          }
      } catch (error: any) {
          toast.error(error.response.data.message);
      }
      },
    }),
    {
      name: 'restaurant-name',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
