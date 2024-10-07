const User=require("../models/userSchema.js");


//  login form controller
module.exports.loginForm=(req,res)=>{
    res.render("user/login.ejs");
};

// register form controller
module.exports.registerForm=(req,res)=>{
    res.render("user/register.ejs");
};

// user login controller 
module.exports.userLogin=async(req,res,next)=>{

    req.flash("success","Welcome back to Wonderlust! ");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
 };

// user register controller
 module.exports.userRegister= async (req, res, next) => {

    try {
        
        const { email, password, username, fullName, address, addressnew, country, city, zip } = req.body.user;
        let url=req.file.path;
        let filename=req.file.filename;
        // Create new user instance
        const newUser = new User({
            email,
            username,
            fullName,
            country,
            address,
            addressnew,
            city,
            zip
        });
        newUser.avatar={url,filename};
        // Register the user with passport-local-mongoose (auto hashes password)
        const registeredUser = await User.register(newUser, password);  // No need for username here

        console.log(registeredUser);

        // Log the user in after registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to wanderlust!");
            let redirectUrl=res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
        });

    } catch (err) {
        console.error(err);
        req.flash("error", err.message);
        res.redirect("/register");
    }
};

// user logout controller 
module.exports.userLogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};




// user profile controller
module.exports.userProfileControl=async(req,res)=>{
    if (!req.isAuthenticated()) {
        return res.redirect('/login');  // If user isn't logged in, redirect to login page
    }
  return  res.render("user/userprofile.ejs",{user:req.user});
};




module.exports.userProfile=async(req,res,next)=>{
    res.send("user profile")
};