import mongoose, { Document, Model } from "mongoose";

export interface IMenu {
    // _id:mongoose.Schema.Types.ObjectId;
    name:string;
    description:string;
    price:number;
    image:string;
    rating:number;
}
export interface IMenuDocument extends IMenu, Document {
    createdAt:Date;
    updatedAt:Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  // rating:{
  //   type:Number,
  //   default:0
  // }
},{timestamps:true});




export const Menu: Model<IMenuDocument> =
  mongoose.models.Menu || mongoose.model<IMenuDocument>("Menu", menuSchema);