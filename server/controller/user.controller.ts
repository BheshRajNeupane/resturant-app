import { type Request , type Response } from 'express';
import UserServices from '../services/user.service';
import { StatusCodes } from '../constant/statusCodes';


class UserController {

  async Signup(req: Request, res: Response) {

    const response = await UserServices.Signup(req.body)
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Created Successfully.',
      data: response,
    });
}
  async Login(req: Request, res: Response) {

    const response = await UserServices.Login(req.body)
    console.log(response);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Login Successfull.',
      data: response,
    });
}
  async VerifyEmail(req: Request, res: Response) {
    console.log("VV", req.body);
    const response = await UserServices.VerifyEmail(req.body)
    
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Email verified Successfull.',
      data: response,
    });
}

}

export default UserController  