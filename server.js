require("dotenv").config()
const cors=require("cors")
const express=require("express")
const app=express()
const connectDB=require("./config/db")
const roomRoutes=require("./routes/roomRoutes")
const bookingsRoutes=require("./routes/bookingRoutes")
const userRoutes=require("./routes/userRoutes")
const cookieParser=require("cookie-parser")
const { auth } = require("./middleware/authMiddleware")

const port=process.env.PORT || 4040;

// connect to database
connectDB()

// /setup middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({ extended: true}))

// setup routes
app.use("/auth",auth)
app.use("/api/rooms",roomRoutes)
app.use("/api/bookings",bookingsRoutes)
app.use("/api/users",userRoutes)
app.get("/users/logout",(req,res)=>{
    res.cookie("jwt"," ",{expiresIn:"-1"})
   return res.json({Message:"logout"})
})

//add errorhandler
// app.use(errorHandler)

app.listen(port,()=>console.log(`Server started on http://localhost:${port}`))