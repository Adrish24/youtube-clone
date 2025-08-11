import bcrypt from "bcrypt";
import { users } from "../utils/users.js";
import { channels } from "../utils/channels.js";

export async function register(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const userFound = users.find((user) => user.email === email);

    if (!userFound) {
      return res
        .status(404)
        .json({ message: "User does not exist or wrong email" });
    }
    const isPasswordValid = userFound.password === password;

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Password" });

    //     const ownedChannels = await channelModel.find({
    //   channelId: { $in: userFound.channels },
    // }).select("channelId name handle"); // select only needed fields

    const ownedChannels = channels
      .filter((channel) => userFound.channels.includes(channel.channelId))
      .map((channel) => ({
        channelId: channel.channelId,
        channelName: channel.channelName,
        handle: channel.handle,
        avatar: channel.avatar,
        subscribers: channel.subscribers,
      }));

    const currentUser = {
      userId: userFound.userId,
      username: userFound.username,
      email: userFound.email,
      avatar: userFound.avatar,
      channels: userFound.channels,
      activeChannel: userFound.activeChannel || null,
    };

    res.status(200).json({ currentUser, ownedChannels });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Please try again later." });
  }
}

export async function switchChannel(req, res) {
  const { userId, channelId } = req.body;
  if (!userId || !channelId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const userFound = users.find((user) => user.userId === userId);

    if (!userFound) {
      return res
        .status(404)
        .json({ message: "User does not exist or wrong email" });
    }

    userFound.activeChannel = channelId;

    const ownedChannels = channels
      .filter((channel) => userFound.channels.includes(channel.channelId))
      .map((channel) => ({
        channelId: channel.channelId,
        channelName: channel.channelName,
        handle: channel.handle,
        avatar: channel.avatar,
        subscribers: channel.subscribers,
      }));

    const currentUser = {
      userId: userFound.userId,
      username: userFound.username,
      email: userFound.email,
      avatar: userFound.avatar,
      channels: userFound.channels,
      activeChannel: userFound.activeChannel || null,
    };

    res.status(200).json({ currentUser, ownedChannels });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Please try again later." });
  }
}
