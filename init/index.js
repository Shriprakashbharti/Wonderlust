const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="";
 
main().then(()=>{
    console.log("Connected to database.");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};


const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6704527842c159bd72cd68d2"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

};

initDB();