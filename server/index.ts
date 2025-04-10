import express from "express";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { DotenvConfig } from "./config/env.config";
import { auditLoggerError, auditLoggerSuccess } from "./logger/audit.logger";
import router from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";



const app = express();

app.use(cors());


const PORT = DotenvConfig.PORT || 3000;

const DIRNAME = path.resolve();

app.use(bodyParser.json())

app.use(auditLoggerSuccess);

app.get("/" , ()=>{
    console.log("dds")
    return "hhdfe"
})
// routes

app.use(router)




app.use(auditLoggerError)

//Global error
app.use(errorHandler)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
