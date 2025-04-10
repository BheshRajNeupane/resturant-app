// middlewares/catchAsync.ts

import {  RequestHandler, type NextFunction, type Request, type Response } from 'express';


export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // res.status(400).json(err)
    return fn(req, res, next).catch( err=>
       next(err)
      );
  };
};

