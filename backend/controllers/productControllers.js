const Product=require("../models/productModel");
const ErrorHandler=require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary=require("cloudinary");


//Create Product --Admin

exports.createProduct=catchAsyncErrors(async (req,res,next)=>{
  let images=[];
  if(typeof req.body.images==="string"){
      images.push(req.body.images);
  }else{
   images=req.body.images;
  }

  const imagesLinks=[];

  for(let i=0;i<images.length;i++){
     const result=await cloudinary.v2.uploader.upload(images[i],{
      folder:"products",
     });
     imagesLinks.push({
      public_id:result.public_id,
      url:result.secure_url,
     });
  }
  req.body.images=imagesLinks;
  req.body.user=req.user.id;
  
  const product=await Product.create(req.body);

  res.status(201).json({
    success:true, //what if we don't mention this  then we get the error in terminal but keeps on sending req.so we need to handle these async error also [catchAsyncError]
    product
  });
  
}
)

//get all products

exports.getAllProducts= catchAsyncErrors(async(req,res,next)=>{
 
  const resultPerPage=8;
  const productsCount=await Product.countDocuments();

  const apiFeature= new ApiFeatures(Product.find(),req.query)
  .search().filter();

  let products=await apiFeature.query;//here found filtered products
  let filteredProductsCount=products.length; //here found no. of filtered prods
  apiFeature.pagination(resultPerPage);
  
  //const products=await Product.find(); apiFeature returns the Product.find,no need to use it again
   products=await apiFeature.query.clone();

    res.status(200).json({ success:true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
}
);

//get all products --admin

exports.getAdminProducts= catchAsyncErrors(async(req,res)=>{
 
 const products=await Product.find();

    res.status(200).json({ success:true,
      success:true,
      products,
    });
}
);

//update product --Admin

exports.updateProduct= catchAsyncErrors(async (req,res,next)=>{
 

  let product= await Product.findById(req.params.id);

  if(!product){
    /* return res.status(500).json({ //replacing it after doing error handling using error,errorhandler,middleware
     success:false,
     message:"product not found"
   })*/
  return next(new ErrorHandler("Product not found",404));
 }
 //Images start here

 let images=[];
  if(typeof req.body.images==="string"){
      images.push(req.body.images);
  }else{
   images=req.body.images;
  }

  if(images !==undefined){
    //Dleting images from cloudinary
 for(let i=0;i<product.images.length;i++){
  await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  const imagesLinks=[];

  for(let i=0;i<images.length;i++){
     const result=await cloudinary.v2.uploader.upload(images[i],{
      folder:"products",
     });
     imagesLinks.push({
      public_id:result.public_id,
      url:result.secure_url,
     });
  }
  req.body.images=imagesLinks;
  }


  product= await Product.findByIdAndUpdate(req.params.id,req.body,
    {new:true,
      runValidators:true,
      useFindAndModify:false
    }
      );

      res.status(200).json({
        success:true,
        product
      });

});

//get product details

exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{

  const product=await Product.findById(req.params.id);

  if(!product){
     /* return res.status(500).json({ //replacing it after doing error handling using error,errorhandler,middleware
      success:false,
      message:"product not found"
    })*/
   return next(new ErrorHandler("Product not found",404));
  }

  res.status(200).json({
    success:true,
    product
  });
});

//delete product

exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{

  const product=await Product.findById(req.params.id);

  if(!product){
    /* return res.status(500).json({ //replacing it after doing error handling using error,errorhandler,middleware
     success:false,
     message:"product not found"
   })*/
  return next(new ErrorHandler("Product not found",404));
 }

 //Dleting images from cloudinary
 for(let i=0;i<product.images.length;i++){
 await cloudinary.v2.uploader.destroy(product.images[i].public_id);
 }
    await product.deleteOne();

    res.status(200).json({
      success:true,
      message:"Product Deleted Successfully"
    })
});

//create new review or update the review
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{


  const{rating,comment,productId}=req.body;

  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  };

  const product=await Product.findById(productId);

  const isReviewed=product.reviews.find(
    (rev)=>rev.user.toString()===req.user._id.toString()) ;
                   //rev gives individual review in reviews arr nd rev.user give user id of that specific review
  if(isReviewed){
    product.reviews.forEach((rev)=>{
      if(rev.user.toString()===req.user._id.toString()){
      rev.rating=rating,
      rev.comment=comment
      }  //agr pehle se user ne review dia hai toh dubara uski id name kyu mention krna just review aur rating batao
    });

  }else{
    product.reviews.push(review);
    product.numOfReviews=product.reviews.length;
  }
  let avg=0;
  product.reviews.forEach(rev=>{
    avg+=rev.rating;
  })
  product.ratings=avg/product.reviews.length;

  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true
  });
});

//Get All reviews of a product

exports.getProductReviews= catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHandler("Product not found",404));
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews
  });
});

//Delete review

exports.deleteReview= catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("Product not found",404));
  }

  const reviews =product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());
//here we have to use reviews van't use review coz it will not match in actual schema .Also here we r just reassigning the value not creating new review
  let avg=0;
  reviews.forEach(rev=>{
    avg+=rev.rating;
  });

  let ratings=0;
  if(reviews.length===0){
    ratings=0;
  }else{
    ratings=avg/reviews.length;
  }
  

  const numOfReviews=reviews.length;

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },
  {
    new:true,runValidators:true,useFindAndModify:false}
  );

   res.status(200).json({
    success:true,
  });


});