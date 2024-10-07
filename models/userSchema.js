const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMogoose=require("passport-local-mongoose");


const userSchema=new Schema({
    email:{
        type:String,
        required:[true,"Email is required!"],
    },
    fullName:{
        type:String,
        require:[true,"Name is Required!"]
    },
    username:{
        type:String,
        require:true
    },
    
    address:{
        type:String,
        required:[true,"Address is Required!"]
    },
    city:{
        type:String,
        required:[ true,"City is Required!"],
    },
    country:{
        type:String,
        required:[ true,"Country is Required!"],
    },
    zip:{
        type:String,
        required:[true,"Zip Code Is Required!"],
    },
    avatar:{
        url:String,
        filename:String,
    }
   
});

userSchema.plugin(passportLocalMogoose);

module.exports=mongoose.model("User",userSchema);