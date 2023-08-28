class ErrorHandler extends Error{ //errorhandler inherits error class which is default class of node
constructor(message,statusCode){
super(message);
this.statusCode=statusCode

Error.captureStackTrace(this,this.constructor);//gives exact location of error of callled function
}
}

module.exports=ErrorHandler