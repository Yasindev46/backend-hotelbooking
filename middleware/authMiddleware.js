const jwt = require("jsonwebtoken");
const User=require("../models/userModel")

const auth = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;
    console.log("token======",token)
    if (!token) {
      return res.status(400).json({ message: "not authorized" });
    }
    //verify token
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user=await User.findById(data.id)
    if(!user){
        return res.status(401).json({message:"invalid user"})
    }
    // req.user=user;
    // return res.json(user)
    next();
  } catch (error) {
    console.log("token Error",error.message);
    return res.status(400).json({ message: "no token" });
}
};


module.exports = { auth };
