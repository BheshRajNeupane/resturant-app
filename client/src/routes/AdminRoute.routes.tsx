import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

 export const AdminRoute = ({children}:{children:React.ReactNode}) => {
    const {user, isAuthenticated} = useUserStore();
    if(!isAuthenticated){
      return <Navigate to="/login" replace/>
    }
    if(!user?.admin){
      return <Navigate to="/" replace/>
    }
  
    return children;
  }