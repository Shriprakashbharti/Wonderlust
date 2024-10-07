const { number } = require("joi");
const moongoose=require("mongoose");
const Schema=moongoose.Schema;

const reviewShema=new Schema({
    rating:{
        type:Number,
        min:1,
        max:5
    },
    comment:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

const Review=moongoose.model("Review",reviewShema);
module.exports=Review;
