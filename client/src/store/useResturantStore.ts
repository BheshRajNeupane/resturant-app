import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import AxiosInstance from '@/api/axios';
import encryptDecrypt from '@/utils/encryptDecrypt';
import { RestaurantState, MenuItem } from '@/types/resturant.types';

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
            console.log("restREsGER" , response)
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
        // Add your API logic here
      },

      addMenuToRestaurant: (menu: MenuItem) => {
        // const current = get().restaurant;
        // if (current) {
        //   const updated = { ...current, menu: [...current.menu, menu] };
        //   set({ restaurant: updated });
        // }
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

      setAppliedFilter: (value: string) => {
        // set((state) => ({
        //   appliedFilter: [...state.appliedFilter, value],
        // }));
      },

      resetAppliedFilter: () => {
        // set({ appliedFilter: [] });
      },

      getSingleRestaurant: async (restaurantId: string) => {
        // Add your API logic here
      },

      getRestaurantOrders: async () => {
        // Add your API logic here
      },

      updateRestaurantOrder: async (orderId: string, status: string) => {
        // Add your API logic here
      },
    }),
    {
      name: 'restaurant-name',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
