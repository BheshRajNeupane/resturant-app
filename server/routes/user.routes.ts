import { Router } from 'express';
import UserController from '../controller/user.controller';
import RequestValidator from '../middleware/Request.Validator';
import { SignupDTO } from '../dto/auth.dto';
import { catchAsync } from '../utils/catchAsync.utils';
const router = Router();

const userController = new UserController()

router.post(
    '/signup',
    RequestValidator.validate(SignupDTO),
    catchAsync(userController.Signup)
  );
router.post(
    '/login',
    // RequestValidator.validate(),
    catchAsync(userController.Login)
  );
router.post(
    '/verify-email',
    // RequestValidator.validate(),
    catchAsync(userController.VerifyEmail)
  );

  export default router