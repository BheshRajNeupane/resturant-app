import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Mail, LockKeyhole, Loader2, User, PhoneOutgoing } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { userSignupSchema, SignupInputState } from "../schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const redirectToGoogleSSO = ()=>{

   
  const googleLoginURL = "http://localhost:8000/login/google";
  const newWindow = window.open(
    googleLoginURL,
    "_self",
    "width=500,height=600"
  );

 
}

const Signup = () => {
  // const loading = false;

  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
const { signup , loading  } = useUserStore()
const navigate = useNavigate()

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // const updatedInput = { ...input };
    // updatedInput[name] = value;
    // setInput(updatedInput);

    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler =  async (e: FormEvent) => {
    e.preventDefault();

    //form validation check start
    const result = userSignupSchema.safeParse(input);

    if( !result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
     return;
    }
        setErrors({}); 

  try{

     await signup(input)
     navigate("/verify-email");

  }catch(error){
    console.log(error);
  }

  };




  return (
    <div className="flex items-center justify-center min-h-screen w-full">

    <div className="w-full md:w-[40%] h-auto  ml-6 mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <form action="" onSubmit={loginSubmitHandler}>
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Testing</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your full name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500   pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.fullname} </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10"
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
              placeholder="Password"
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

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="9867403322"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500   pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.contact} </span>
            )}
          </div>
        </div>

        <div className="mb-3">
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
              Signup{" "}
            </Button>
          )}
         

        </div>
        <div className="">
      
      <Button
      onClick={redirectToGoogleSSO}
     
        className=" w-full bg-blue-600 hover:bg-blue-400"
      >
        {" "}
        Signup with Google{" "}
      </Button>
    
  </div>

        
        
        <p className="mt-1 mb-4">
          Already have account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
       
      </form>
     
     
        
    </div>
    </div>
  );
};

export default Signup;
