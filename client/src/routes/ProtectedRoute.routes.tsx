import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

 export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated , user , oauth2VerifyEmail } = useUserStore();
   

    if (!isAuthenticated  ) {
      return <Navigate to="/login" replace />;
    }
  
    // user?.user?.isVerified 
const isUserEmailVerified = user?.isVerified || oauth2VerifyEmail;

    if (!isUserEmailVerified) {
      return <Navigate to="/verify-email" replace />;
    }
    return children;
  };