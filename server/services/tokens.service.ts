import jwt from 'jsonwebtoken';
import { DotenvConfig } from '../config/env.config';
import { Response } from 'express';
import {  IUserDocument } from '../models/user.model';




class TokenService{
    sign(user: IUserDocument ) {
        const payload:any = {userid:user._id  }
        const token = jwt.sign(payload, DotenvConfig.JWT_SECRET as string, {
            expiresIn: DotenvConfig.JWT_TOKEN_EXPIRE,
          });
    
    // res.cookie('access_token', token, {
    //   httpOnly: true,w
    //   secure: true, 
    //   // sameSite: 'Strict', 
    //   maxAge: 24 * 60 * 60 * 1000 
    // });
    
        return token
    }
    verify(token: string, secret: string) {
        return jwt.verify(token, secret);
      }
      //Email verify 
      generateVerificationCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let verificationCode = '';
        const charactersLength = characters.length;
      
        for (let i = 0; i < 6; i++) {
          verificationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
        return verificationCode;
    }; 

      
   
}
export default TokenService; 
