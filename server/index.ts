import express from "express";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { DotenvConfig } from "./config/env.config";
import { auditLoggerError, auditLoggerSuccess } from "./logger/audit.logger";
import router from "./routes/user.routes";
import Auth0Routes from "./routes/Auth0.routes";
import resturantRoutes from "./routes/resturant.routes";
import menuRoutes from "./routes/menu.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";
import passport from "passport";
require("./OAuth/passportGoogleSSO");
import session from "express-session";
// import MongoStore from "connect-mongo";



const app = express();

app.use(cors());



const PORT = DotenvConfig.PORT || 3000;

const DIRNAME = path.resolve();

app.use(bodyParser.json())

app.use(auditLoggerSuccess);





app.use(
    session({
      secret: "asdd"!,
      resave: false,
      saveUninitialized: false,
    //   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false, // set to true in production with HTTPS
      },
    })
  );


app.use(passport.initialize());
app.use(passport.session());
// routes


app.get("/api", (req, res) => {
console.log(req.user)
    res.send("Welcome to the server");
});


app.use(router)
app.use(Auth0Routes);
app.use(resturantRoutes)
app.use(menuRoutes)
// app.use((req, res, next) => {
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//     next();
//   });
app.use(auditLoggerError)

//Global error
app.use(errorHandler)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});


