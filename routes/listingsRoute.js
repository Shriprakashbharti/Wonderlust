const express = require("express");
const router=express.Router();
const qwrapAsync=require("../middlewares/wrapasync");
const { listingSchema}=require("../schema.js");
const ExpressError=require("../middlewares/ExpressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner}=require("../middlewares/auth.js");
const {index,newListing ,
    createNewListing,
     showListing, 
     updateListing,
      updateListingForm, 
      destroyListing,
      data
    }=require("../controllers/listingsController.js");

    const multer  = require('multer');
    const {storage}=require("../cloudinaryConfig.js");
    const upload = multer({storage });

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    };
}






// index route 

router.get("/",qwrapAsync(index));

// new listing form route 
router.get("/new",isLoggedIn,newListing);
  
  // new listing create route 
router.post("/",isLoggedIn,upload.single("listing[image]"), validateListing, qwrapAsync(createNewListing));

  // show route 
  router.get("/:id",qwrapAsync(showListing));
  
  // edit route 
  
  router.get("/:id/edit",isLoggedIn,qwrapAsync(updateListingForm));
  
  
  // update route
  router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"), validateListing, qwrapAsync(updateListing));
  
//   destroy route
  router.delete("/:id",isLoggedIn,isOwner, qwrapAsync(destroyListing));

  module.exports=router;
 