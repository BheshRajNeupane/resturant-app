import mongoose from "mongoose";
import { DotenvConfig } from "../config/env.config";

const connectDB = async () => {
    try {
        await mongoose.connect(DotenvConfig.MONGO_URL as string,{serverSelectionTimeoutMS: 5000});
        
        console.log('mongoDB connected.');
    } catch (error) {
        console.log(error);
    }
}  
export default connectDB;