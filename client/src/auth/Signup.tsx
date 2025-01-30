import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Mail, LockKeyhole, Loader2, User, PhoneOutgoing } from "lucide-react";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { userSignupSchema, SignupInputState } from "../schema/userSchema";

// type SignupInputState = {
//   fullname: string;
//   email: string;
//   password: string;
//   contact: number;
// };

const Signup = () => {
  const loading = false;

  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // const updatedInput = { ...input };
    // updatedInput[name] = value;
    // setInput(updatedInput);

    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    //form validation check start
    const result = userSignupSchema.safeParse(input);
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    if( !result.success){
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
     return;
    }
        setErrors({}); 
        console.log(input);
    


  };

  return (
    <div>
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
              placeholder="Enter your contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500   pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.contact} </span>
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
        </div>
        <Separator />
        <p className="mt-2">
          Already have account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
