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
import ordersRooutes from "./routes/order.routes";

import menuRoutes from "./routes/menu.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";
import passport from "passport";
require("./OAuth/passportGoogleSSO");
import session from "express-session";
// import MongoStore from "connect-mongo";
import toobusy from "toobusy-js";
import helmet from "helmet";


const app = express();

app.use(cors());



const PORT = DotenvConfig.PORT || 3000;

const DIRNAME = path.resolve();


// middleware which blocks requests when we're too busy
app.use(function(req, res, next) {
  if (toobusy()) {
    res.status(503).send("I'm busy right now, sorry.");
  } else {
    next();
  }
});


app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],  
      scriptSrc: ["'self'"],  
      frameAncestors: ["'none'"], 
      styleSrc: ["'none'"]
    }
  })
);


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
// console.log( "reqest>>>>>>>>>>>>" ,req)
    res.send("Welcome to the server get");
});

app.post("/api", (req, res) => {
// console.log( "reqest>>>>>>>>>>>>" ,req)
    res.send("Welcome to the server post ");
});


app.use(router)
app.use(Auth0Routes);
app.use(resturantRoutes)
app.use(menuRoutes)
app.use(ordersRooutes)
// app.use((req, res, next) => {
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//     next();
//   });
app.use(auditLoggerError)




//Global error
app.use(errorHandler)

 const server = app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});

process.on('SIGINT', function() {
  server.close(() => {
    toobusy.shutdown();
    process.exit(0); // exit with success
  });
});


