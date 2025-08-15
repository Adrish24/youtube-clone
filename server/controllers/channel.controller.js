import User from "../models/User.model.js";
import Channel from "../models/Channel.model.js";
import Video from "../models/Video.model.js";

export async function createMyChannel(req, res) {
  const { name, handle } = req.body;
  const { user } = req;

  if (!name || !handle) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // create a new channel
    // it will automatically throw an error if the channelName or handle already exists
    const createdChannel = await Channel.create({
      channelName: name,
      handle: `@${handle}`,
      owner: user._id,
    });

    // update the user with the new channel
    // and set the active channel to the newly created channel
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          channels: createdChannel._id,
        },
        $set: {
          activeChannel: createdChannel._id,
        },
      },
      { new: true }
    ).select("-password");

    // fetch the owned channels to return in the response
    const ownedChannels = await Channel.find({
      _id: { $in: updatedUser.channels },
    }).select("channelName handle avatar subscribers");

    res.status(201).json({ currentUser: updatedUser, ownedChannels });
  } catch (error) {
    console.log(error);

    // Handle duplicate key error
    // This means the channelName or handle already exists
    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "Channel already exists with this name or handle. Try different name or handle.",
      });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}

// Function to get channel by handle
export async function getChannelByhandle(req, res) {
  const { handle } = req.params;

  try {
    // Find the channel by handle
    const channel = await Channel.findOne({ handle });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Fetch the videos associated with the channel
    const channelVideos = await Video.find({
      _id: { $in: channel.videos },
    }).sort({ createdAt: -1 });

    res.status(200).json({ channel, channelVideos });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}
