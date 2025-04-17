import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Mail, LockKeyhole, Loader2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import {  userLoginSchema,LoginInputState } from "../schema/userSchema"
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";



const redirectToGoogleSSO = ()=>{

   
  const googleLoginURL = "http://localhost:8000/login/google";
  const newWindow = window.open(
    googleLoginURL,
    "_self",
    "width=500,height=600"
  );

 
}


const Login = () => {
  // const loading = false;
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
 const { login  , loading} = useUserStore();
  const navigate = useNavigate()

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async(e: FormEvent) => {
    e.preventDefault();
    //form validation check start
    const result = userLoginSchema.safeParse(input);
 
    if (!result.success) {
   
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    setErrors({}); 
  try {
 
    await login(input);
    navigate("/");
  } catch (error) {
      
  }
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
    <div className="  w-full md:w-[70%] h-auto  ml-6 mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <form action="" onSubmit={loginSubmitHandler} className="flex flex-col gap-3 ">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Testing</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 "
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500   pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.email} </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500   pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.password} </span>
            )}
          </div>
        </div>

        <div className="mb-10">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className=" w-full bg-orange hover:bg-hoverOrange"
            >
              {" "}
              Login{" "}
            </Button>
          )}
          <div className="mt-4">
            <Link
              to="/forget-password"
              className="text-blue-500 hover:underline"
            >
              Forget Password
            </Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
      <div className="mb-10 mt-3">
            
                  <Button
                  onClick={redirectToGoogleSSO}
                 
                    className=" w-full bg-blue-600 hover:bg-blue-400"
                  >
                    {" "}
                    Login with Google{" "}
                  </Button>
                
              </div>
    </div>

    </div>
  );
};

export default Login;
