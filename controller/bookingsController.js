const Bookings = require("../models/bookingModel");
const nodemailer = require("nodemailer");

const getBookings = async (req, res,next) => {
  try {
    const bookings = await Bookings.find({});
    if (!bookings) {
      res.status(400);
      throw new Error("Noo bookings found");
    }
    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Helper function to send booking confirmation email
const sendBookingEmail = async (newBooking) => {
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
    to: newBooking.email,
    subject: "Booking Confirmation",
    text: `Dear ${newBooking.name},\n\nYour booking in Jeeshan hotel from ${newBooking.checkinDate} to ${newBooking.checkoutDate} is confirmed.\n\nThank you for choosing us!`,
  };
  await transporter.sendMail(mailOptions);
  console.log("Booking confirmation email sent to:", newBooking.email);
};


const newBooking = async (req, res, next) => {
  try {
    const newBooking = await Bookings.create(req.body);
    if (!newBooking) {
      res.status(400);
      throw new Error("Can not add new room");
    }
    sendBookingEmail(newBooking).catch(console.error);
    return res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

const getBooking = async (req, res,next) => {
  try {
    const booking = await Bookings.findById(req.params.id);
    if (!booking) {
      res.status(400);
      throw new Error("Room not found");
    }
    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res,next) => {
  try {
    const updateBooking = await Bookings.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateBooking) {
      res.status(400);
      throw new Error("Update booking error");
    }
    res.status(200).json(updateBooking);
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res,next) => {
  try {
    const deleteBooking = await Bookings.findByIdAndDelete(req.params.id);
    if (!deleteBooking) {
      res.status(400);
      throw new Error("Room can not delete");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  newBooking,
  updateBooking,
  deleteBooking,
  getBooking,
};
