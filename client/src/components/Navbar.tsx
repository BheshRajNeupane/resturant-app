import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "./ui/separator";
// import { MenubarItem, MenubarMenu } from "@radix-ui/react-menubar";
import { useThemeStore} from "@/store/useThemeStore"

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Loader2,
  Moon,
  HandPlatter,
  ShoppingCart,
  Sun,
  Menu,
  User,
  PackageCheck,
  SquareMenu,
  UtensilsCrossed,
  
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";


const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
  const { user, loading, logout } = useUserStore();
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(null);

console.log("location", location);  
  
  const handleCartClick = () => {
    if (location.pathname === "/cart") {

      if (lastLocation) {
        navigate(lastLocation);
      } else {
        navigate(-1); 
      }
    } else {
      
      setLastLocation(location.pathname );
      navigate("/cart");
    }
  };


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className="font-bold text-2xl md:font-extrabold">Testing</h1>{" "}
        </Link>
        <div className="hidden md:flex gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home </Link>
            <Link to="/profile">Profile </Link>
            <Link to="/order/status">Order </Link>
          </div>
          { 
           //user?.admin 
          true && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Dashboard</MenubarTrigger>
                <MenubarContent>
                  <Link to="/admin/restaurant">
                    <MenubarItem> Resturant</MenubarItem>
                  </Link>
                  <Link to="/admin/menu">
                    <MenubarItem> Menu</MenubarItem>
                  </Link>
                  <Link to="/admin/orders">
                    <MenubarItem> Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
        {/*  mode  selection*/}
        <div className="flex items-center gap-4">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=> setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={()=> setTheme('dark')}>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart />
            {cart.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
                >
                  {cart.length}
                </Button>
              )}
          </Link> */}
          <div onClick={handleCartClick} className="relative cursor-pointer">
      <ShoppingCart />
      {cart.length > 0 && (
        <Button
          size={"icon"}
          className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-500"
        >
          {cart.length}
        </Button>
      )}
    </div>

          <div>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>BN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            {loading ? (
              <Button className="bg-orange hover:bg-hoverOrange">
                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange" onClick={logout}>Logout</Button>
            )}
          </div>
          {/* {Mobile responsive } */}
          <div className="md:hidden lg:hidden ">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

//mobile navbar
const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200  text-black hover:bg-gray-200"
        >
          <Menu size={"icon"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>

        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            {/* <HandPlatter /> */}
            <HandPlatter/>
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>

          <Link
            to="/admin/menu"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <SquareMenu />
            <span>Menu</span>
          </Link>
          <Link
            to="/admin/restaurant"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <UtensilsCrossed />
            <span>Restaurant</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <PackageCheck />
            <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>BN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Bhesh Raj Neupane</h1>
          </div>
          <SheetClose asChild>
            <Button type="submit" className="bg-orange hover:bg-hoverOrange">
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
