import express from "express";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { DotenvConfig } from "./config/env.config";



const app = express();

const PORT = DotenvConfig.PORT || 3000;

const DIRNAME = path.resolve();




// api

// app.use(express.static(path.join(DIRNAME,"/client/dist")));
// app.use("*",(_,res) => {
//     res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
// });

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
