import {v2 as cloudinary} from "cloudinary";
import { DotenvConfig } from "../config/env.config";

cloudinary.config({
    api_key:DotenvConfig.CLOUDINARY_API_KEY,
    api_secret:DotenvConfig.CLOUDINARY_API_SECRET,
    cloud_name:DotenvConfig.CLOUDINARY_CLOUD_NAME,

});

export default cloudinary;