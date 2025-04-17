import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

const MainLayout = () => {
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");


  // useEffect(() => {
  //   if (token) {
  //     // Send token to the parent window
  //     window.opener?.postMessage({ token }, "http://localhost:3000");
  //     window.close();
  //   }
  // }, [token])

  return (
    <>
    <div className="flex flex-col min-h-screen m-2  md:m-0">
      {/*Navbar */}
      <header>
        <Navbar />
      </header>
      {/* Main content */}
      <div className="flex-1">
        <Outlet />
      </div>

      
    </div>
    {/* Footer */}
    <Footer /></>
  );
};

export default MainLayout;
