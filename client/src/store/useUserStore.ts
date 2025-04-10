import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";
import AxiosInstance from '@/api/axios';
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from 'sonner';

type User = {
    fullname:string;
    email:string;
    contact:number;
    address:string;
    city:string;
    country:string;
    profilePicture:string;
    admin:boolean;
    isVerified:boolean;
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input:SignupInputState) => Promise<void>;
    login: (input:LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email:string) => Promise<void>; 
    resetPassword: (token:string, newPassword:string) => Promise<void>; 
    updateProfile: (input:any) => Promise<void>; 
}

 export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
        user:null,
        isAuthenticated: false,
        isCheckingAuth: true,
        loading: false,
        signup: async (input: SignupInputState) => {
            try {
                set({ loading: true });
                const response = await AxiosInstance.post('/signup', input , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data.success) { 
                    toast.success(response.data.message);
                    set({ loading: false, user: response.data.user, isAuthenticated: true });
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
                set({ loading: false });
                throw error;
            }
        },
        login: async (input: LoginInputState) => {
            try {
                set({ loading: true });
                const response = await AxiosInstance.post('/login', input , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } );
               
                if (response.data.success) { 
                    toast.success(response.data.message);
                    set({ loading: false, user: response.data.user, isAuthenticated: true });
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
                set({ loading: false });
                 throw error;
            }
        },
        verifyEmail: async (verificationCode: string) => {
            try {
                set({ loading: true });
                
                const response = await AxiosInstance.post('/verify-email', { verificationCode } , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data.success) { 
                    toast.success(response.data.message);
                    set({ loading: false, user: response.data.user, isAuthenticated: true });
                }
            } catch (error: any) {
                toast.error(error.response.data.message);
                set({ loading: false });
                throw error;
            }
        },
        checkAuthentication: async () => {
            // Placeholder implementation
            set({ loading: false });
        },
        logout: async () => {
            // Placeholder implementation
            set({ loading: false });
        },
        forgotPassword: async (email: string) => {
            // Placeholder implementation
            set({ loading: false });
        },
        resetPassword: async (token: string, newPassword: string) => {
            // Placeholder implementation
            set({ loading: false });
        },
        updateProfile: async (input: any) => {
            // Placeholder implementation
            set({ loading: false });
        },

 }), {
    name: 'user-name',
    storage: createJSONStorage(() => localStorage),
}

  ))