"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const path_1 = __importDefault(require("path"));
const env_config_1 = require("./config/env.config");
const app = (0, express_1.default)();
const PORT = env_config_1.DotenvConfig.PORT || 3000;
const DIRNAME = path_1.default.resolve();
// api
// app.use(express.static(path.join(DIRNAME,"/client/dist")));
// app.use("*",(_,res) => {
//     res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
// });
app.listen(PORT, () => {
    (0, connectDB_1.default)();
    console.log(`Server listen at port ${PORT}`);
});
