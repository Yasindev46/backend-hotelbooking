const Room = require("../models/roomModel");

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    if (!rooms) {
      res.status(400);
      throw new Error("Rooms not found");
    }
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

// create room
const createRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    if (!room) {
      res.status(400);
      throw new Error("Problem in creating room");
    }
    const rooms=await Room.find({})
    return res.status(201).json(rooms);
  } catch (error) {
    next(error);
  }
};

//get single room
const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(400);
      throw new Error("Room not found");
    }
    res.status(200).json(room);
  } catch (error) {
    console.log(error.message);
  }
};

//update room
const updateRoom = async (req, res,next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateRoom) {
      res.status(400);
      throw new Error("Update eroor");
    }
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

//Delete room
const deleteRoom = async (req, res,next) => {
  try {
    const deleteRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deleteRoom) {
      res.status(400);
      throw new Error("No room to delete");
    }
    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};


module.exports = { getRooms, createRoom, getRoom, updateRoom, deleteRoom };
