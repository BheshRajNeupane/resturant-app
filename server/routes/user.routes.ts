import { Router } from 'express';
import UserController from '../controller/user.controller';
import RequestValidator from '../middleware/Request.Validator';
import { SignupDTO , LoginDTO  ,VerifyEmailDto ,UpdateProfileDto } from '../dto/auth.dto';
import { catchAsync } from '../utils/catchAsync.utils';
import { isAuthenticated } from '../middleware/isAuthenticated';
import upload from '../middleware/multer';
const router = Router();

const userController = new UserController()

router.get(
    '/check-auth',
    isAuthenticated,
    catchAsync(userController.CheckAuth)
  );
router.post(
    '/signup',
    RequestValidator.validate(SignupDTO),
    catchAsync(userController.Signup)
  );
router.post(
    '/login',
    RequestValidator.validate(LoginDTO),
    catchAsync(userController.Login)
  );
router.post(
    '/verify-email',
    // RequestValidator.validate(VerifyEmailDto),
    catchAsync(userController.VerifyEmail)
  );
router.post(
    '/forgot-password',
   
    catchAsync(userController.ForgetPassword)
  );
router.post(
    '/reset-password/:token',
    // RequestValidator.validate(),
    catchAsync(userController.ResetPassword)
  );
  router.put(
    '/profile/update',
    // RequestValidator.validate(UpdateProfileDto),
    isAuthenticated,
    upload.single("profilePicture"),
    catchAsync(userController.UpdateProfile))
router.post(
    '/logout',
    catchAsync(userController.LogOut)
  );

  export default router;


