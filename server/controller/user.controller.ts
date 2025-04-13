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
    console.log(response.access_token);
     res.cookie("token", response.access_token, {
      // httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    
   
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Login Successfull.',
      data: response,
    });
}
  async VerifyEmail(req: Request, res: Response) {
    const response = await UserServices.VerifyEmail(req.body)
    
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Email verified Successfull.',
      data: response,
    });
}
  async LogOut(req: Request, res: Response) {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully."
  });
}
 async ForgetPassword(req: Request, res: Response) {
    const response = await UserServices.ForgetPassword(req.body)
    
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Password reset link sent to your email.',
      data: response,
    });
 }
 async ResetPassword(req: Request, res: Response) {
    const { token } = req.params;
    const { newPassword } = req.body;
    const response = await UserServices.ResetPassword( newPassword, token)
    
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Password reset successfully.',
      data: response,
    });
 }
 async CheckAuth(req: Request, res: Response) {
    const userId = req.userId as string ;
    const response = await UserServices.CheckAuth(userId)
    res.status(StatusCodes.CREATED).json({  
      success: true,
      message: 'User.',
      data: response,
    });

 }

async UpdateProfile(req: Request, res: Response) {
    const userId  = req.userId as string;
    const response = await UserServices.UpdateProfile(userId, req.body)
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Profile updated successfully.',
      data: response,
    });

  }
 
}

export default UserController  