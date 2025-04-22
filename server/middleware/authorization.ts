import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpException from "../utils/HttpException.utils";
import { DotenvConfig } from "../config/env.config";


export const isAuthorize = async (
    req: Request ,
    res: Response,
    next: NextFunction
  ) => {


     if(!req.admin){
      //  next( HttpException.badRequest("You are not authorize"))
     }
     next()

  }

  export default isAuthorize