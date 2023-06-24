const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("./catchAsyncErrors");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

exports.isAuthenticatedUser= catchAsyncErrors(async(req,res,next)=>{

    const {token}=req.cookies; //brackets are used so that we get the keyva;ue only not the key

    //console.log(token); value of token is printed

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }
  const decodedData=jwt.verify(token,process.env.JWT_SECRET);

  req.user=await User.findById(decodedData.id); //we can access decoded data whenever user makes a req
next();
});

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
     if(!roles.includes(req.user.role)) {//req.user.role gives the value of role of requested user and roles is the array of all the roles in the database
 return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`),403
 );
} // 403 know what we want to do but refusing to do
     next();  
    };
};