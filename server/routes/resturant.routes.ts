import { Router  } from 'express';
import ResturantController from '../controller/resturant.controller';
import RequestValidator from '../middleware/Request.Validator';
import { isAuthenticated } from '../middleware/isAuthenticated';
import isAuthorize from '../middleware/authorization';
import upload from "../middleware/multer"
import { catchAsync } from '../utils/catchAsync.utils';

const router = Router();

const resturantController = new ResturantController()

//one admin can create one resturant

router.post('/restaurant/create' ,
    isAuthenticated,
    isAuthorize,
    // RequestValidator
    upload.single("imageFile"),

     catchAsync( resturantController.Create)
)
router.patch('/restaurant/update' ,
    isAuthenticated,
    isAuthorize,
    // RequestValidator
    upload.single("imageFile"),
    catchAsync( resturantController.Update)
)
router.get('/restaurant/' ,
    isAuthenticated,
    // isAuthorize
    // RequestValidator
    resturantController.Get
)
// router.patch('/order/:orderId/status' ,
//     isAuthenticated,
//     isAuthorize,
//     // RequestValidator
//     resturantController.UpdareOrderStatus
// )
router.get('/search/:searchText' ,
    // isAuthenticated,
    // isAuthorize,
    // RequestValidator
    resturantController.SearchRestaurant
)
router.get('/restaurant/:id' ,
    // isAuthenticated,
    // isAuthorize
    // RequestValidator
    resturantController.getSingleRestaurant
)
router.get('/restaurant/admin/orders' ,
    isAuthenticated,
    // isAuthorize
    // RequestValidator
    resturantController.GetRestaurantOrder
)

router.put('/order/:orderId/status' ,
    isAuthenticated,
    // isAuthorize
    // RequestValidator
    resturantController.UpdareOrderStatus
)


export default router