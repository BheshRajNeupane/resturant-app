import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 character"),
  contact: z.string().min(10, "Contact number must be 10 digit"),
});
//zod provide type also
export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 character"),
  captcha: z.string().min(1, "Captcha is required"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;

export const userForgetPasswordSchema = z.object({
  email:z.string().email("Invalid email address")
})

export type ForgetPasswordInputState = z.infer<typeof userForgetPasswordSchema>;