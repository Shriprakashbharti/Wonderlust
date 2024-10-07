const express= require("express");
const app= express();
const mongoose= require("mongoose");
const User=require("./models/userSchema.js");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const qwrapAsync=require("./middlewares/wrapasync.js");
const ExpressError=require("./middlewares/ExpressError.js");
const errorMiddleware=require("./middlewares/ExpressError.js");
const dotenv=require("dotenv");
dotenv.config({path:"./.env"});
const cookieParser = require ("cookie-parser");
const listings= require("./routes/listingsRoute.js");
const reviews=require("./routes/reviewRoute.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const userRoutes=require("./routes/userRoute.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");





// database access

main().then(()=>{
    console.log("Connected to database.");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);

};

app.use(cookieParser());
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    mongoUrl:process.env.MONGO_URL,

    crypto:{
        secret:process.env.APP_SECRET
    },
    touchAfter:24*3600,
});


store.on("error",()=>{
    console.log("Error in mongo session store");
})
const sessionOption={
    store,
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
}

};




app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



app.get("/",qwrapAsync(async(req,res,next)=>{
    const allListings=  await Listing.find({});
  
    res.render("listings/home.ejs",{allListings});
}));



app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews)
app.use("/user",userRoutes)



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
});


app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("Eror.ejs",{message});
    // res.send("----Somthings went wrong!.----");
});

app.use(errorMiddleware);
module.exports=app;
