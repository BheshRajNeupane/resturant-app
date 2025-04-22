import multer , { FileFilterCallback }  from "multer"
import { Request } from "express";
import HttpException from "../utils/HttpException.utils";

const multerStorage = multer.memoryStorage();


const multerFilter = (req :Request, file: Express.Multer.File, cb :FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb( HttpException.badRequest('Only .jpg, .jpeg, .png files are allowed!'));
  }
};


const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, //  2MB limit
  },
});

export default upload