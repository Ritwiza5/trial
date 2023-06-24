const express=require("express");
const {getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getProductReviews, deleteReview,getAdminProducts}=require("../controllers/productControllers");
const{isAuthenticatedUser,authorizeRoles} =require("../middleware/auth");
const router=express.Router();

router.route("/products").get(getAllProducts);//used for sake of testing
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview);//Agar isAutheticated nhi mention kia toh user object ki keys access nahi hongi eg user.id etc
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);
module.exports=router