import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { DotenvConfig } from "../config/env.config";
import { User } from "../models/user.model";
import HttpException from "../utils/HttpException.utils";

const GOOGLE_CALLBACK_URL = `http://localhost:8000/auth/google/callback 
`;


passport.use(
  
    new GoogleStrategy(
        {
            clientID: DotenvConfig.GOOGLE_AUTH_CLIENT_ID!,
            clientSecret: DotenvConfig.GOOGLE_AUTH_CLIENT_SECRET!,
            callbackURL: `http://localhost:8000/auth/google/callback`,
            passReqToCallback: true,
            
        },
         async( req , accessToken, refreshToken, profile, cb) => {
       
            try {
              console.log("email", profile.emails?.[0].value )

            
                const existingUser = await User.findOne({ email: profile.emails?.[0].value });
 
                if (existingUser) {
                  if (existingUser.provider === "local") {
                    
                    return cb(
                       new Error("Please login with email and password. You've already signed up using form."),
                      false
                    );
                  }
            
                  // Google login success
                   return cb(null, existingUser);
                }

             
               
        
        
                const user = await User.create({
                  fullname: profile.displayName,
                  email: profile.emails?.[0].value,
                  googleId: profile.id,
                  provider:"google"
                  
                });
                user.isVerified = true;
                await user.save()
        
                if (user) return cb(null, user); //  Signup
              } catch (error) {
                console.error("Error during Google authentication:", error);
                cb(error, false);
              }
        }
    )
);
passport.serializeUser((user, cb) => { 
    console.log("Serializing user:", (user as any));
    cb(null, user);
  });
  
  passport.deserializeUser(async (id, cb) => {
    
    
     const user = await User.findById(id)
     console.log("Desrialize user:", (user as any));
    if (user) cb(null, user);  
  });