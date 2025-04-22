import { Router } from 'express';
import UserController from '../controller/user.controller';
import passport from 'passport';
import EmailService from '../services/email.service';
import TokenService from '../services/tokens.service';
import { IUserDocument } from '../models/user.model';

const router = Router();

const userController = new UserController()
const successLoginUrl = "http://localhost:5173/";
  const errorLoginUrl = "http://localhost:5173/login/error";
  
  router.get(
    "/login/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: errorLoginUrl,
    }),
    async (req, res) => {
      const user = req.user;
      console.log(user)
      const token : string = new TokenService().sign(user as IUserDocument) ;
  
      
 //encypt token and send
      const redirectURL = `http://localhost:5173/Oauth-sucess?token=${encodeURIComponent(token)}`;
      res.redirect(redirectURL);
    }
  );
  
  
  
  
  
  
  
  export default router;
  