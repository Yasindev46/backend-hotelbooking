const mongoose=require('mongoose')
const roomsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    roomNumbers:{
        type:[{
            number:Number,
            availableDates:[Date]
        }]
    }

})
module.exports=mongoose.model("Room",roomsSchema)