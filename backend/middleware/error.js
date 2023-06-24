const ErrorHandler=require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal server error";

    //Wrong mongodb id error 
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid: ${err.path}`;
        err=new ErrorHandler(message, 400);
    }

    //Mongoose duplicate key error
    if(err.code===11000){
        const message=`Duplicate email Entered`
        err=new ErrorHandler(message,400);
    }

    //Wrong mongodb id error 
    if(err.name==="JsonWebTokenError"){
        const message=`Json WebToken is Invalid,try again`;
        err=new ErrorHandler(message, 400);
    }

    //JWT Expire Error
    if(err.name==="TokenExpiredError"){
        const message=`Json WebToken is Expired,try again`;
        err=new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success:false,
        error:err.message //can also use err.stack to get location
    });
}