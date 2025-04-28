import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRouter } from "./routes/index.routes";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { useUserStore } from "./store/useUserStore";


function App() {
  const {checkAuthentication, isCheckingAuth} = useUserStore();
   // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);
  if(isCheckingAuth) return <Loading/>
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
