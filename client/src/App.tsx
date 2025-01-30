import "./App.css";
import Login from "./auth/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Signup from "./auth/Signup";
import ForgetPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // children:[
    //   {
    //     path:""/
    //   }
    // ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-password",
    element: <VerifyEmail />,
  },
]);

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
