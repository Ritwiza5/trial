//import { fileURLToPath } from 'https://homeease-56gr.onrender.com/';
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
const path=require("path");
const cors=require("cors");
////const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const errorMiddleware=require("./middleware/error");

//Config
//dotenv.config({path:"backend/config/config.env"});
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}

app.use(express.json()) //recognize incoming request object as json object
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors());

//Route Imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
});
//Middleware for error
app.use(errorMiddleware);

module.exports=app;