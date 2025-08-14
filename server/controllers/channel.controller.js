import { channels } from "../utils/channels.js";
import { videos } from "../utils/videos.js";
import { users } from "../utils/users.js";

export async function createMyChannel(req, res) {
  const { name, handle, email } = req.body;

  if (!name || !handle || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userFound = users.find((user) => user.email === email);

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingChannel = channels.find(
      (channel) => channel.handle === handle
    );

    if (existingChannel) {
      return res
        .status(400)
        .json({ message: "Channel already exists with this handle" });
    }

    const newChannel = {
      channelId:  Math.floor(1000000 + Math.random() * 9000000).toString(),
      handle:`@${handle}`,
      channelName: name,
      owner: email,
      description: "",
      channelBanner: "",
      avatar: "",
      subscribers: 0,
      videos: [],
    };

    channels.push(newChannel);

    userFound.channels.push(newChannel.channelId);
    userFound.activeChannel = newChannel.channelId;

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
      activeChannel: userFound.activeChannel,
    };

    res.status(201).json({ currentUser, ownedChannels });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}

export async function getChannelByhandle(req, res) {
  const { handle } = req.params;
  console.log(handle);

  try {
    const channel = channels.find((channel) => channel.handle === handle);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const channelVideos = videos.filter((video) =>
      channel.videos.includes(video.videoId)
    );

    res.status(200).json({ channel, channelVideos });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}
