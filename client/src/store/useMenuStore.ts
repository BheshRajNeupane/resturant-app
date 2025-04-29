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
          
          const response = await AxiosInstance.post('/menu/create', formData , {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        });

          if (response.data.success) {
            toast.success(response.data.message);
            console.log("res" , response.data)
            set({ loading: false, menu: response.data.data });

            // update restaurant --> menu update --> show in available menu
            useResturantStore.getState().addMenuToRestaurant(response.data.data);
          }
        } catch (error: any) {
            console.log(error)
          toast.error(error.response.message || "Something went wrong");
          set({ loading: false });
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        try {
            
          set({ loading: true });
          const response = await AxiosInstance.put(`menu/${menuId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.data });

            // update restaurant
            useResturantStore.getState().updateMenuToRestaurant(response.data.data);
          }
        } catch (error: any) {
          toast.error(error.response.message || "Something went wrong");
          set({ loading: false });
        }
      },
    }),
    {
      name: "menu-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
