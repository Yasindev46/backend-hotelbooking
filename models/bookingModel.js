const mongoose=require("mongoose")

const bookingSchema=new mongoose.Schema({
    roomId:{
        type:mongoose.Schema.ObjectId,
        ref:"Room"
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    checkinDate:{
        type:Date,
        required:true
    },
    checkoutDate:{
        type:Date,
        required:true
    },
    confirmed:{
        type:Boolean,
        required:true
    }
 }, {timestamps:true} )

module.exports=mongoose.model("Bookings",bookingSchema);