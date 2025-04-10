import { log } from "console";
import { User } from "../models/user.model"
import HttpException from "../utils/HttpException.utils";
import BcryptService from "./bcrypt.service";
import TokenService from "./tokens.service";
import EmailService from "./email.service";
import { access } from "fs";

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
    private readonly tokenService =  new TokenService(),
    private readonly emailService = new EmailService(),
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
            const verificationToken = this.tokenService.generateVerificationCode();
            
  

             user= await User.create({
                fullname,
                email,
                password: hashedPassword,
                contact: Number(contact),
                verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
            })


               
            //jwt token
            const jwtToken =  this.tokenService.sign(user);

            //send email verification
        await this.emailService.sendVerificationEmail(user.email , verificationToken);
        console.log("user", user);
  return { user , access_token: jwtToken  };

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
         
       
             const jwtToken =  this.tokenService.sign(user);

           
            user.lastLogin = new Date()
           
            await user.save();
         

        return { user , access_token: jwtToken };

      }catch(err :any){
        throw err;
      }

    }

    async VerifyEmail({verificationCode}:any){
       try {
       
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gte: Date.now() } })
       
        
 console.log("userVV", user);

        if(!user){
          throw HttpException.notFound("Mail is not verified")
      }
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined
      await user.save();
        this.emailService.sendWelcomeEmai(user.email , user.fullname);
      // // send email
              // // send welcome email
        
        return user;
       } catch (error) {
        throw error;
       }
    }
  


}


export default  new UserServices;