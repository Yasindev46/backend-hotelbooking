const errorHandler=(error,req,res,next)=>{
    const statusCode=res.statusCode?statusCode:500;
    return res.status(statusCode).json({message:error.message})
    // return res,json({message:error.message,statusCode:status})
} 

module.exports={errorHandler,};