const errorHandler=(error,req,res,next)=>{
    if (res.headersSent) {
        return next(error);
    }
    const statusCode=res.statusCode || 500;
    return res.status(statusCode).json({message:error.message})
    // return res,json({message:error.message,statusCode:status})
} 

module.exports={errorHandler,};