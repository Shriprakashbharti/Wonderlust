class ExpressError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        
    }
}


 const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error!";
    err.statusCode=err.statusCode || 500;
    
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyVlaue)} Entered`;
        err=new ExpressError(message,400);
    }

    if(err.name==="JsonWebTokenError"){
        const message= `Json Web Token Is Expires. Try To Again!`;
        err=new ExpressError(message,400);
    }

    if(err.name==="TokenExpireError"){
        const message=`Json Web Token Is Expire. Please Try Again!`;
        err=new ExpressError(message,400);
    }

    if(err.name==="CastError"){
        const message=`Invailid ${err.path}`;
        err=new ExpressError(message,400);
    }
    

    const errorMessage=err.errors ?
     Object.values(err.errors).map((error)=>error.message).join(" ") : err.message;

     return res.status(err.statusCode).json({
        success:false,
        message: errorMessage,
     });

     
};

module.exports=errorMiddleware;

module.exports=ExpressError;