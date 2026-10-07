const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
        conn=mongoose.connect(process.env.MONGO_URI)
        console.log("connected to database")
    } catch (error) {
        console.log("error in database",error.message)
        process.exit(1)
    }
}

module.exports=connectDB;