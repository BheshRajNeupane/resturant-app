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

    if (!decoded || !decoded.userId) {
      return next(HttpException.unauthorized('Invalid token'));
    }

 
    req.userId = decoded.userId  // || req.user;

    next();
  } catch (error: any) {
    return next(HttpException.unauthorized('Authentication failed'));
  }
};
