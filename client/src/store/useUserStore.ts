
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AxiosInstance from '@/api/axios';
import { toast } from 'sonner';
import { LoginInputState, SignupInputState } from '@/schema/userSchema';
import encryptDecrypt  from '@/utils/encryptDecrypt';

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | Partial<User> |null;
  token: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  oauth2VerifyEmail:boolean;
  googleAuth:(token:string )=>void;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      oauth2VerifyEmail:false,
      googleAuth:( token : string ) => {
  // try{
      

        set({ isCheckingAuth: true  , token: token , oauth2VerifyEmail:true , isAuthenticated:true });
      // }catch(err:any){
      //   toast.error(err.message)
      // }
      
     
        
      },
      
      
      

      signup: async (input) => {
        try {
          set({ loading: true });
          const res = await AxiosInstance.post('/signup', input);
          if (res.data.success) {
            toast.success(res.data.message);
            set({
              loading: false,
              user: res.data.data,
              isAuthenticated: true,
            });
          }
        } catch (err: any) {
          toast.error(err.response.data.message);
          set({ loading: false });
          throw err;
        }
      },

      login: async (input) => {
        try {
          set({ loading: true });
          const res = await AxiosInstance.post('/login', input);
          if (res.data.success) {
            const token = res.data.data.access_token;
        
         

            toast.success(res.data.message);
            set({
              loading: false,
              token,
              user: res.data.data,
              isAuthenticated: true,
            });
          }
        } catch (err: any) {
          toast.error(err.response.data.message);
          set({ loading: false });
          throw err;
        }
      },

      verifyEmail: async (verificationCode) => {
        try {
          set({ loading: true });
          const res = await AxiosInstance.post('/verify-email', { verificationCode });
          if (res.data.success) {
            toast.success(res.data.message);
            set({
              loading: false,
              user: res.data.data,
              isAuthenticated: true,
            });
          }
        } catch (err: any) {
          toast.error(err.response.data.message);
          set({ loading: false });
          throw err;
        }
      },

      checkAuthentication: async () => {
        const encrypted = localStorage.getItem('access_token');
        if (!encrypted) return set({ isCheckingAuth: false });

        try {
          const token = encryptDecrypt.decrypt(encrypted);
          const res = await AxiosInstance.get('/check-auth', 
          
        );

          if (res.data.success) {
            set({
              token,
              user: res.data.data,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (err) {
          set({ isCheckingAuth: false, isAuthenticated: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          const res = await AxiosInstance.post('/logout');
          if (res.data.success) {
            // localStorage.removeItem('access_token');
            toast.success(res.data.message);
            set({
              loading: false,
              token: null,
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (err: any) {
          toast.error(err.response.data.message);
          set({ loading: false });
        }
      },

      forgotPassword: async (email) => {
        try {
          set({ loading: true });
          const res = await AxiosInstance.post('/forgot-password', { email });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false });
          }
        } catch (err: any) {
          toast.error(err.response.data.message);
          set({ loading: false });
        }
      },

      resetPassword: async (token, newPassword) => {
        try {
          set({ loading: true });
          const res = await AxiosInstance.post(`/reset-password/${token}`, { newPassword });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false });
          }
        } catch (err: any) {
          toast.error(err.response.data.message);
          set({ loading: false });
        }
      },

      updateProfile: async (input) => {
        try {
          const res = await AxiosInstance.put('/profile/update', input);
          if (res.data.success) {
            toast.success(res.data.message);
            set({ user: res.data.data });
          }
        } catch (err: any) {
          toast.error(err.response.data.message);
        }
      },
    })
    ,
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({ token: state.token ? encryptDecrypt.encrypt(state.token ) : null } ), // Only persist encrypted token
           
    }
  )
);
