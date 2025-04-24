import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpException from "../utils/HttpException.utils";
import { DotenvConfig } from "../config/env.config";


export const isAuthenticated = async (
  req: Request ,
  res: Response,
  next: NextFunction
) => {
  try {
    
    console.log("user >" , req.user)
    const token =
      req.cookies?.access_token ||
      req.headers.authorization?.split(' ')[1] ;
     

    if (!token) {
      return next(HttpException.unauthorized('User not authenticated'));
    }

  
    const decoded = jwt.verify(token, DotenvConfig.JWT_SECRET !) as jwt.JwtPayload;

    console.log("decoded",decoded)
    if (!decoded ) {
      return next(HttpException.unauthorized('Invalid token'));
    }

 
    req.userId = decoded.userid
    req.admin = decoded.admin 
   
    

    next();
  } catch (error: any) {
   
    if (error.name === 'JsonWebTokenError') {
      next(
        HttpException.unauthorized(
          'Your token has expired. Please login again.'
        )
      );
      return;
    }
    return next(HttpException.unauthorized('Authentication failed'));
  }
};
