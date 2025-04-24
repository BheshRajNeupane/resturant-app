import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useResturantStore } from "./useResturantStore";
import AxiosInstance from "@/api/axios";


type MenuState = {
  loading: boolean;
  menu: null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await AxiosInstance.post(`/menu/create`, formData);

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });

            // update restaurant
            useResturantStore.getState().addMenuToRestaurant(response.data.menu);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Something went wrong");
          set({ loading: false });
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        // try {
        //   set({ loading: true });
        //   const response = await AxiosInstance.put(`${API_END_POINT}/${menuId}`, formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   });

        //   if (response.data.success) {
        //     toast.success(response.data.message);
        //     set({ loading: false, menu: response.data.menu });

        //     // update restaurant
        //     useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        //   }
        // } catch (error: any) {
        //   toast.error(error?.response?.data?.message || "Something went wrong");
        //   set({ loading: false });
        // }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
