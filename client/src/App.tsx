import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRouter } from "./routes/index.routes";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { useUserStore } from "./store/useUserStore";
import { useThemeStore } from "./store/useThemeStore";


function App() {
  const initializeTheme = useThemeStore((state:any) => state.initializeTheme);
  const {checkAuthentication, isCheckingAuth} = useUserStore();
   // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    initializeTheme()
  }, [checkAuthentication]);
  if(isCheckingAuth) return <Loading/>
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
