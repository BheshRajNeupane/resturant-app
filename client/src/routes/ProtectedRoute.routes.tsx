import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

 export const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated , user } = useUserStore();
   
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    console.log("user", user);
  
const isUserVerified = user?.isVerified || user?.user?.isVerified;
     console.log("isUserVerified", isUserVerified);
    if (!isUserVerified) {
      return <Navigate to="/verify-email" replace />;
    }
    return children;
  };