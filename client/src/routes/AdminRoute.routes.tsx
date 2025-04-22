import { useUserStore } from "@/store/useUserStore";
import { Navigate } from "react-router-dom";

 export const AdminRoute = ({children}:{children:React.ReactNode}) => {
    const {user, isAuthenticated} = useUserStore();
    if(!isAuthenticated){
      return <Navigate to="/login" replace/>
    }
   
    // if(!user?.admin){
    if(user?.admin) { //test
      return <Navigate to="/" replace/>
    }
  
    return children;
  }
  //admin not allow to signup with google