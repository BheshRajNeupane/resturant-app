import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

 export const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, user , oauth2VerifyEmail  } = useUserStore();

    if(isAuthenticated && ( user?.isVerified  ||  oauth2VerifyEmail)){
  
      return <Navigate to="/" replace/>
    }
    ;
    return children;
  };