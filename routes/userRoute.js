const express = require("express");
const router=express.Router();
const qwrapAsync=require("../middlewares/wrapasync");
const User=require("../models/userSchema.js");
const passport = require('passport');
const { isLoggedOut, saveRedirectUrl } = require("../middlewares/auth.js");
const { loginForm, registerForm, userLogin, userRegister, userLogout, userProfile, userProfileControl } = require("../controllers/userController.js");

const multer  = require('multer');
const {storage}=require("../cloudinaryConfig.js");
const upload = multer({storage });
// login form route

router.get("/login",loginForm);

// register form route
router.get("/register",registerForm);

// user login route
router.post("/login",saveRedirectUrl,
     passport.authenticate("local",
        {failureRedirect:"/user/login",
            failureFlash:true})
             ,userLogin);

            // user register route 
router.post("/register",saveRedirectUrl, upload.single("user[avatar]"), qwrapAsync(userRegister));
// user logout route
router.get("/logout",isLoggedOut,userLogout);

// user profile route
router.get("/profile",qwrapAsync(userProfileControl));

module.exports=router;