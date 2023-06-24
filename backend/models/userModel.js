const mongoose= require("mongoose");
const validator=require("validator");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto"); //built in module

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    }, 
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than than 8 characters"],
        select:false,
    },
    avatar:{
        
            public_id:{
                type:String,
               required:true
            },
            url:{
               type:String,
               required:true
            }
},
role:{
    type:String,
    default:"user",
},
createdAt:{
 type:Date,
 default:Date.now,
},
resetPasswordToken:String,
resetPasswordExpire:Date
});

//pre means doing before, save is the event i.e performing the function before sthe event save
//here we have used async func isntead of arrow coz here we need to use this keyword nd we can't use this in => fun
userSchema.pre("save",async function(next){

if(!this.isModified("password")){ //agr password chng nhi krre toh mat kro hash
    next();
}
 this.password= await bcrypt.hash(this.password,10);
});


//JWT TOKEN [chk krega ki yeh user hai ya nahi nd uss hisab se routes ka access dega]

userSchema.methods.getJWTToken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
};

//Compare Password
userSchema.methods.comparePassword=async function(enteredPassword){
  return  await bcrypt.compare(enteredPassword,this.password);
};

//Generating password reset token
userSchema.methods.getResetPasswordToken=function(){

    //Generating Token
    const resetToken=crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;

    return resetToken;
};


module.exports=mongoose.model("User",userSchema);