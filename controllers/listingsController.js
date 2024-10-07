
const { query } = require("express");
const Listing=require("../models/listing");
const mapToken=process.env.MAP_TOKEN;

// index route 
module.exports.index=async (req,res)=>{
    const allListings=  await Listing.find({});
    res.render("listings/index.ejs",{allListings});
  };
  // new listing form route 
module.exports.newListing=async(req,res)=>{
    res.render("listings/new.ejs"); 
 };
 const categoryEnums = {
  Trending: 1,
  Room: 2,
  Iconics: 3,
  Beachfront: 4,
  Farms: 5,
  Islands: 6,
  Arctic: 7,
  Boats: 8,
  Tower: 9,
  Beach: 10,
};
  // new listing create route 
module.exports.createNewListing=async (req,res,next)=>{    
    let url=req.file.path;
    let filename=req.file.filename;
    const listing= new Listing (req.body.listing);
    const selectedCategory = req.body.listing.category;
    listing.category = categoryEnums[selectedCategory];
    listing.owner=req.user._id;
    listing.image={url,filename};
    await listing.save();
    console.log(listing);
    req.flash("success","New Host Added!")
    res.redirect("/listings");


};
  // show route 
module.exports.showListing=async (req,res)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{
      path:"author",
    }}).populate("owner");
    if(!listing){
      req.flash("error","No Longer Available!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};
  // edit form route 
module.exports.updateListingForm=async(req,res)=>{
    let {id}= req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};
  // update route
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let ulisting= await Listing.findByIdAndUpdate(id,{...req.body.listing});
 
     if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        ulisting.image={url,filename};
        console.log(ulisting);
       await ulisting.save();
       
     }
     req.flash("success"," Host Updated Successfully!");
     if(!Listing){
      req.flash("error","No Longer Available!");
      res.redirect("/listings");
    }
    res.redirect("/listings");
};
//   destroy route
module.exports.destroyListing=async (req,res)=>{
    let {id} = req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    req.flash("success"," Host Deleted Successfully!")
    res.redirect("/listings");
};