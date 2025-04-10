import jwt from 'jsonwebtoken';
import { DotenvConfig } from '../config/env.config';
import { IUser } from '../models/user.model';




class TokenService{
    sign(id:string , role?:string , user?:IUser) {
        const payload:any = {userid:id ,role : role || null }
        const token = jwt.sign(payload, DotenvConfig.JWT_SECRET as string, {
            expiresIn: DotenvConfig.JWT_TOKEN_EXPIRE,
          });
        return token
    }
    verify(token: string, secret: string) {
        return jwt.verify(token, secret);
      }
   
}
export default TokenService; 
