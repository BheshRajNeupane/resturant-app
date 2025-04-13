import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpException from "../utils/HttpException.utils";
import { DotenvConfig } from "../config/env.config";


// export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req?.cookies?.access_token  //|| req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             HttpException.unauthorized("User not authenticated")

//         }
    
//         const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
      
//         if (!decode) {
//         HttpException.unauthorized("Invalid token")
//         }
        
//         req.userId = decode.userId;
//         next();
//     } catch (error) {
//       throw error;
//     }
// }

export const isAuthenticated = async (
  req: Request ,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const token =
      req.cookies?.access_token ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(HttpException.unauthorized('User not authenticated'));
    }

    // Verify token
    const decoded = jwt.verify(token, DotenvConfig.JWT_SECRET !) as jwt.JwtPayload;

    if (!decoded || !decoded.userId) {
      return next(HttpException.unauthorized('Invalid token'));
    }

 
    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    return next(HttpException.unauthorized('Authentication failed'));
  }
};
