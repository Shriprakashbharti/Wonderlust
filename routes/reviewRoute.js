const express=require("express");
const router=express.Router({mergeParams:true});
const {reviewSchema }=require("../schema.js");
const Review=require("../models/reviewsSchema.js");
const ExpressError=require("../middlewares/ExpressError.js");
const qwrapAsync=require("../middlewares/wrapasync.js");
const {isLoggedInReview}=require("../middlewares/auth.js");
const {isLoggedInReviewD}=require("../middlewares/auth.js");
const { userReview, reviewDestroy } = require("../controllers/reviewController.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);

    }else{
        next();
    }
};

// review post

router.post("/",isLoggedInReview,validateReview,qwrapAsync(userReview));

// review delete route
router.delete("/:reviewId",isLoggedInReviewD,qwrapAsync(reviewDestroy));


module.exports=router;