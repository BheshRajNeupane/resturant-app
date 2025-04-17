import mongoose , {Document , Model} from "mongoose";


 export interface IUser {
    fullname:string;
    email:string;
    password:string;
    contact:number;
    address:string;
    city:string;
    country:string;
    profilePicture:string;
    admin:boolean;
    lastLogin?: Date;
    isVerified?: boolean;
    googleId:String,
    provider:String
    resetPasswordToken?:string;
    resetPasswordTokenExpiresAt?:Date;
    verificationToken?:string;
    verificationTokenExpiresAt?:Date

}

export interface IUserDocument extends IUser, Document {
    createdAt:Date;
    updatedAt:Date;
}


const userSchema = new mongoose.Schema<IUserDocument>({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: function (this: IUserDocument) {
          return !this.googleId; // password required only if not a Google user
        }
      },
      
    contact: {
        type: Number,
        // required: true
    },
    address: {
        type: String,
        default:"",
    },
    city:{
        type:String,
        default:"",
    },
    country:{
        type:String,
        default:"",
    },
    profilePicture:{
        type:String,
        default:"",
    },
    admin:{type:Boolean, default:false},
    // advanced authentication
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    googleId: {
        type:String,
        default:null
        
    },
  
provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
 
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
},{timestamps:true});

// Indexing email field
// userSchema.index({ email: 1 }); 

 export const User:Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema);