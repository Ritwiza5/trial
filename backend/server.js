const app=require("./app");

//const dotenv=require("dotenv");
const cloudinary=require("cloudinary");
const connectDatabase=require("./config/database");

//Handling uncaught error exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

//Config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}


//Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


const server=app.listen(process.env.PORT,()=>{

    console.log(`Server is running successfully at ${process.env.PORT}`);
});

//console.log(youtube); //uncaught error

//Unhandled Promise Rejections jab mongodb ki connection url hi galt ho 
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
}); //now remove catch from database.js cpz error is handled here now