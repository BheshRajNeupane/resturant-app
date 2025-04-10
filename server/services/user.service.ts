import { log } from "console";
import { User } from "../models/user.model"
import HttpException from "../utils/HttpException.utils";
import BcryptService from "./bcrypt.service";
import TokenService from "./tokens.service";

interface ISignup{
  fullname:string,
  email:string,
    password:string,
    contact:string
}

interface ILogin{
  email:string,
    password:string,
}

class UserServices{
   constructor(
    private readonly bcryptService = new BcryptService(),
    private readonly tokenService =  new TokenService()
   ){}

      async Signup({fullname , email , password , contact}:ISignup){
        try{
            let user = await User.findOne({
                email
            });
            if(user){
                throw HttpException.badRequest("User already exists")
            }
            

            const hashedPassword = await this.bcryptService.hash(password);
            // const verificationToken = this.tokenService.generateVerificationToken();
            const verificationToken= '123456'
  

             user= await User.create({
                fullname,
                email,
                password: hashedPassword,
                contact: Number(contact),
                verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
            })


               
            //jwt token
            // const jwtToken = ;

            //send email verification

  return user;

      }catch(err :any){
        throw err;
      }

    }
  

      async Login({email , password }:ILogin){
        try{
          let user = await User.findOne({ email }).select('+password');

            if(!user){
                throw HttpException.notFound("User doesnot exists")
            }
           
            if( user && !(await this.bcryptService.compare(password ,user.password))){
              throw HttpException.badRequest("Incorrect email or password")
            }
         
            // const verificationToken = this.tokenService.generateVerificationToken();
            const verificationToken= 'asdfghjkl'
  


            //jwt token ; set cookie
            // this.tokenService.sign()
            // user
            user.lastLogin = new Date()
           

            //send email verification
            console.log(user , "User");

  return user;

      }catch(err :any){
        throw err;
      }

    }

    async VerifyEmail({verificationToken}:any){
       try {
        const verificationCode = verificationToken;

        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } })

        if(!user){
          throw HttpException.notFound("Mail is not verified")
      }
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined
      await user.save();
      
              // // send welcome email
              // await sendWelcomeEmail(user.email, user.fullname);
        return user;
       } catch (error) {
        throw error;
       }
    }
  


}


export default  new UserServices;