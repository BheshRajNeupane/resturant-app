
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import HeroSection from "@/components/HeroSection";
import Signup from "@/auth/Signup";
import ForgetPassword from "@/auth/ForgetPassword";
import ResetPassword from "@/auth/ResetPassword";
import VerifyEmail from "@/auth/VerifyEmail";
import Profile from "@/components/Profile";
import SearchPage from "@/components/SearchPage";
import RestaurantDetail from "@/components/ResturantDetails";
import Cart from "@/components/Cart";
import Resturant from "@/admin/Resturant";
import AddMenu from "@/admin/AddMenu";
import Orders from "@/admin/Orders";
import Success from "@/components/Success";
import Login from "@/auth/Login";
import { AuthenticatedUser } from "@/routes/AuthenticatedUser.routes";
import { AdminRoute } from "@/routes/AdminRoute.routes";
import { ProtectedRoutes } from "./ProtectedRoute.routes";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoutes> <MainLayout/>  </ProtectedRoutes>),
      children: [
      {
        path: "/",
        element: <HeroSection/>,
      },
      {
        path: "/profile",
        element: <Profile />,
      }, {
        path: "/cart",
        element: <Cart/>,
      }
      ,
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/order/status",
        element: <Success/>,
      },
      //admin service start
      {
        path: "/admin/restaurant",
        element: <AdminRoute><Resturant/> </AdminRoute >,
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu/> </AdminRoute >,
      }

      ,
      {
        path: "/admin/orders",
        element: <AdminRoute><Orders/> </AdminRoute >,
      }

    ],
  },
  {
    path: "/login",
    element: <AuthenticatedUser>
      <Login/>
      </AuthenticatedUser>,
  },
  {
    path: "/signup",
    element:
      <AuthenticatedUser>
      <Signup/>
      </AuthenticatedUser>,
  },
  {
    path: "/forget-password",
    element: <AuthenticatedUser>
      <ForgetPassword />
      </AuthenticatedUser>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail/>,
  },
]);