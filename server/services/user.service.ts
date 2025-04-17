import { log } from "console";
import { IUser, User } from "../models/user.model";
import HttpException from "../utils/HttpException.utils";
import BcryptService from "./bcrypt.service";
import TokenService from "./tokens.service";
import EmailService from "./email.service";
import { access } from "fs";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { DotenvConfig } from "../config/env.config";


interface ISignup {
  fullname: string;
  email: string;
  password: string;
  contact: string;
}

interface ILogin {
  email: string;
  password: string;
}

class UserServices {
  constructor(
    private readonly bcryptService = new BcryptService(),
    private readonly tokenService = new TokenService(),
    private readonly emailService = new EmailService()
  ) {}

  async Signup({ fullname, email, password, contact }: ISignup) {
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        throw HttpException.badRequest("User already exists");
      }

      const hashedPassword = await this.bcryptService.hash(password);
      const verificationToken = this.tokenService.generateVerificationCode();

      user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        contact: Number(contact),
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      //jwt token
      const jwtToken = this.tokenService.sign(user);

      //send email verification
      // await this.emailService.sendVerificationEmail(
      //   user.email,
      //   verificationToken
      // );
      
      return { user, access_token: jwtToken };
    } catch (err: any) {
      throw err;
    }
  }

  async Login({ email, password }: ILogin) {
     
    let inputpassword = password;
    try {
      let existing_user = await User.findOne({ email }).select("+password");

      if (!existing_user) {
        throw HttpException.notFound("User doesnot exists");
      }
      if (existing_user.provider === "google") {
        throw HttpException.badRequest("Please login using Google");
      }
      

      if (
        existing_user &&
        !(await this.bcryptService.compare(inputpassword, existing_user.password  ))
      ) {
        throw HttpException.badRequest("Incorrect email or password");
      }

      const jwtToken = this.tokenService.sign(existing_user);

      existing_user.lastLogin = new Date();

      await existing_user.save();

      let  { password, ...user } = existing_user.toObject();

      return { user, access_token: jwtToken };
    } catch (err: any) {
      throw err;
    }
  }

  async VerifyEmail({ verificationCode }: any) {
    try {
      const user = await User.findOne({
        verificationToken: verificationCode,
        verificationTokenExpiresAt: { $gte: Date.now() },
      });

      if (!user) {
        throw HttpException.notFound("Mail is not verified");
      }
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();
      // this.emailService.sendWelcomeEmai(user.email, user.fullname);
     
      return user;
    } catch (error) {
      throw error;
    }
  }


  async ForgetPassword( { email} : Partial<ILogin>) {
    try {
     
      const user = await User.findOne({ email });

      if (!user) {
        throw HttpException.notFound("User not found");
      }

      const resetToken = crypto.randomBytes(40).toString('hex');
      const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
      await user.save();

      // send email
      // await this.emailService.sendPasswordResetEmail(user.email, `${DotenvConfig.FRONTEND_URL}/reset-password?token=${resetToken}`);

  } catch (error:any ) {
      console.log(error.message);
      throw error;
    }
  }
  
async ResetPassword( newPassword: string, token: string ) {
    try {

      const user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } });
      if (!user) {
          throw HttpException.notFound("Invalid  user or expired password reset token.");
      }
      //update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiresAt = undefined;
      await user.save();

      // send success reset email
      // await  this.emailService.sendResetSuccessEmail(user.email);

      return user;
  } catch (error) {
      throw error;
    }
  }
async CheckAuth(userId: string) {
  try {
    
    const user = await User.findById(userId);
    if (!user) {
        throw HttpException.notFound("User not found");
    };

    return user;
   
} catch (error) {
    throw error;
  }

}

async UpdateProfile( userId: string, updatedData: Partial<IUser>) {
  try {
    
    const user = await User.findById(userId);
    if (!user) {
        throw HttpException.notFound("User not found");
    };
    const { profilePicture , ...rest} = updatedData;
    //profile piceture update on cloudinary

    const updatedUser = await User.findByIdAndUpdate(userId, rest, { new: true });
  

    return updatedUser;
   
} catch (error) {
    throw error;
  }
       
}
}

export default new UserServices();
