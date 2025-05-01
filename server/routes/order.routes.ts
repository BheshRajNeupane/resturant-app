import { Router } from 'express';
import OrderController from '../controller/order.controller';
import RequestValidator from '../middleware/Request.Validator';
import { SignupDTO , LoginDTO  ,VerifyEmailDto ,UpdateProfileDto } from '../dto/auth.dto';
import { catchAsync } from '../utils/catchAsync.utils';
import { isAuthenticated } from '../middleware/isAuthenticated';
import upload from '../middleware/multer';
const router = Router();

const  orderController = new OrderController()


router.post('/checkout/create-checkout-session',
    isAuthenticated,
    // RequestValidator.validate(),

    catchAsync(orderController.CreateSession)
  );
router.get('/order',
    isAuthenticated,
    // RequestValidator.validate(),

    catchAsync(orderController.Get)
  );


  export default router;


