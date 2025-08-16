import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import User from "../models/User.model.js";
import Channel from "../models/Channel.model.js";

// Function to register a new user
export async function register(req, res) {
  const { username, password, email } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User create
    // It will automatically throw error if the user or email already exists
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);

    // Handle duplicate key error
    // This means the email or username already exists
    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "User already exist with this email or username. Try different email or username.",
      });
    }
    res
      .status(500)
      .json({ message: "Something went wrong!. Please try again later." });
  }
}

// Function to login a user
export async function login(req, res) {
  const { password, email } = req.body;

  try {
    // Find the user by email
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res
        .status(404)
        .json({ message: "User does not exist or wrong email" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    // Find channels owned by the user
    // This assumes that the channels are stored in a separate collection
    const ownedChannels = await Channel.find({
      _id: { $in: userFound.channels },
    }).select("channelName handle avatar subscribers");

    // Generate JWT token
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Exclude the password from the user object
    const { password: _, ...currentUser } = userFound._doc;

    res.status(200).json({ currentUser, ownedChannels, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Please try again later." });
  }
}

// Function to switch the active channel for a user
export async function switchChannel(req, res) {
  const { userId, channelId } = req.body;

  try {
    const userFound = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: { activeChannelId: channelId },
      },
      { new: true }
    );

    if (!userFound) {
      return res
        .status(404)
        .json({ message: "User does not exist or wrong email" });
    }

    // Find channels owned by the user
    // This assumes that the channels are stored in a separate collection
    const ownedChannels = await Channel.find({
      _id: { $in: userFound.channels },
    }).select("channelName handle avatar subscribers");

    // Exclude the password from the user object
    const { password: _, ...currentUser } = userFound._doc;

    res.status(200).json({ currentUser, ownedChannels });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Please try again later." });
  }
}
