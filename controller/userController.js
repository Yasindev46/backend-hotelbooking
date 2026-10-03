const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(400);
      throw new Error("users not found");
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Helper function to send booking confirmation email
const sendRegisterEmail = async (newUser) => {
  // Configure transporter (use your SMTP credentials)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: newUser.email,
    subject: "Welcome to Jeeshan Hotel",
    text: `Dear ${newUser.name},\n\nYour registration in Jeeshan hotel as an admin is completed.\nPlease use ${newUser.email} as user id & password set by you while registration for login to jeeshan hotel login page.\n\n Welcome to Jeeshan organisation!`,
  };
  await transporter.sendMail(mailOptions);
  console.log("Registartion confirmation email sent to:", newUser.email);
};

// create user
const createUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    //generate salt
    const salt = await bcrypt.genSalt(10);
    hashendPassword = await bcrypt.hash(password, salt);

    // const user=await User.create(req.body)
    const user = await User.create({
      ...rest,
      password: hashendPassword,
    });
    if (!user) {
      res.status(400);
      throw new Error("Problem in creating user");
    }
    //remove password and send to database
    const otherDetails = { ...user._doc };
    delete otherDetails.password;
    sendRegisterEmail(otherDetails);
    return res.status(201).json(otherDetails);
  } catch (error) {
    next(error);
  }
};

//get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("Room not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    // next(error)
    console.log(error.message);
  }
};

//update user
const updateUser = async (req, res,next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateUser) {
      res.status(400);
      throw new Error("Update eroor");
    }
    return res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

//Delete user
const deleteUser = async (req, res,next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(400);
      throw new Error("No room to delete");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    //check user from database
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }
    //compare the password
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      res.status(400);
      throw new Error("Incorrect password");
    }
    //generate token & set to cookies
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("jwt",token)
    const rest = { ...user._doc };
    delete rest.password;

    //removing password and adding jwt token to database
    res.status(200).json({ ...rest, token });
  } catch (error) {
    next(error);
  }
};

//when logout clear JWT from cookies
// const logoutUser=async(req,res,next)=>{
//   return res.status(200).json({message:"logout"})
// }


module.exports = {
  getUsers,
  getUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  
};
