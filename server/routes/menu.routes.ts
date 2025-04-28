import { Router } from 'express';
import MenuController from '../controller/menu.controller';
import RequestValidator from '../middleware/Request.Validator';
import { SignupDTO , LoginDTO  ,VerifyEmailDto ,UpdateProfileDto } from '../dto/auth.dto';
import { catchAsync } from '../utils/catchAsync.utils';
import { isAuthenticated } from '../middleware/isAuthenticated';
import upload from '../middleware/multer';
const router = Router();

const munuController = new MenuController()


router.post('/menu/create',
    isAuthenticated,
    // RequestValidator.validate(),
    upload.single("image"),
    catchAsync(munuController.Create)
  );
router.put('/menu/:menuId',
    isAuthenticated,
    // RequestValidator.validate(),
    upload.single("image"),
    catchAsync(munuController.Update)
  );


  export default router;


