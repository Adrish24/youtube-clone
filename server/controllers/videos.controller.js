import Video from "../models/Video.model.js";
import Channel from "../models/Channel.model.js";

export async function uploadVideo(req, res) {
  const { title, category, description, videoUrl, thumbnailUrl } = req.body;

  try {
    // find the channel by channelId
    const activeChannel = await Channel.findById(req.user?.activeChannelId);

    if (!activeChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Check if the user is the owner of the channel
    if (activeChannel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        messahe: "You are not authorize to upload video to this channel",
      });
    }

    // Create a new video
    // and associate it with the channel
    const newVideo = await Video.create({
      title,
      category,
      description,
      video: videoUrl,
      thumbnail: thumbnailUrl,
      channelName: activeChannel.channelName,
      channelId: activeChannel._id,
      avatar: activeChannel.avatar,
      handle: activeChannel.handle,
      uploader: req.user?._id,
    });

    // Add the new video to the channel's videos array
    await Channel.findByIdAndUpdate(activeChannel._id, {
      $push: { videos: newVideo._id },
    });

    res.status(201).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}

// Function to get videos by category
export async function getVideosByCategory(req, res) {
  const { category } = req.query;
  try {
    if (!category || category === "") {
      return res.status(400).json({ message: "category is empty" });
    }

    let videos;

    // If category is "All", fetch all videos
    // Otherwise, fetch videos by the specified category
    if (category === "All") {
      videos = await Video.find().sort({
        createdAt: -1,
      });
    } else {
      videos = await Video.find({ category }).sort({
        createdAt: -1,
      });
    }

    // If no videos found, return a 404 status
    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Function to update video details
export async function updateVideo(req, res) {
  const { videoId } = req.params;
  const { title, description, category, videoUrl, thumbnailUrl } = req.body;

  try {
    // find the channel by channelId
    const activeChannel = await Channel.findById(req.user?.activeChannelId);

    if (!activeChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Check if the user is the owner of the channel
    if (activeChannel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        messahe: "You are not authorize to upload video to this channel",
      });
    }

    // Find the video by videoId and update its details
    const videoFound = await Video.findByIdAndUpdate(videoId, {
      $set: {
        title,
        description,
        category,
        video: videoUrl,
        thumbnail: thumbnailUrl,
      },
    });

    if (!videoFound) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}

export async function deleteVideo(req, res) {
  const { videoId } = req.params;

  try {
    // find the channel by channelId
    const activeChannel = await Channel.findById(req.user?.activeChannelId);

    if (!activeChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Check if the user is the owner of the channel
    if (activeChannel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        messahe: "You are not authorize to upload video to this channel",
      });
    }

    activeChannel.videos = activeChannel.videos.filter(
      (vid) => vid.toString() !== videoId
    );

    await activeChannel.save();

    // Find the video by videoId and update its details
    const videoFound = await Video.findByIdAndDelete(videoId);

    if (!videoFound) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "video deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}
