import bodyParser from "body-parser";
import express from "express";
import cros from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router_config from "./config/router_config.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const URI = process.env.MONGODB_URL;
app.use(bodyParser.json({limit : '30mb'}));
app.use(bodyParser.urlencoded({extended:true , limit : '30mb'}));
app.use(cros());
app.use(cookieParser());
app.use(express.json());

router_config(app);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("ket noi database thanh cong");
    http : app.listen(PORT , () => {
        console.log(`server is running at port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
})