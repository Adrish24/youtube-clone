import { channels } from "../utils/channels.js";
import { videos } from "../utils/videos.js";

export async function uploadVideo(req, res) {
  const { title, category, description, videoUrl, thumbnailUrl, channelId } =
    req.body;
  try {
    const channelFound = channels.find(
      (channel) => channel.channelId === channelId
    );
    if (!channelFound) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const newVideo = {
      videoId: Math.floor(1000000 + Math.random() * 9000000).toString(),
      title,
      category,
      description,
      src: videoUrl,
      thumbnailUrl,
      channelId: channelFound.channelId,
      channelName: channelFound.channelName,
      channelAvatar: channelFound.avatar,
      handle: channelFound.handle,
      views: 0,
      likes: 0,
      dislikes: 0,
      comments: [],
      uploadDate: "2024-09-20",
    };

    videos.push(newVideo);

    channelFound.videos.push(newVideo.videoId);

    res.status(201).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}

export async function getVideos(req, res) {
  const { category } = req.query;
  try {
    if (!category || category === "") {
      return res.status(400).json({ message: "category is empty" });
    }

    const filteredVideos = videos.filter(
      (video) => video.category.includes(category) || category === "All"
    );

    if (filteredVideos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    res.status(200).json({ filteredVideos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export async function updateVideo(req, res) {
  const { videoId } = req.params;
  console.log(videoId);
  try {
    const videoFound = videos.find((vid) => vid.videoId === videoId);
    if (!videoFound) {
      return res.status(404).json({ message: "Video not found" });
    }

    const { title, description, category, videoUrl, thumbnailUrl } = req.body;
    videoFound.title = title;
    videoFound.description = description;
    videoFound.category = category;
    videoFound.src = videoUrl;
    videoFound.thumbnailUrl = thumbnailUrl;
    videoFound.uploadDate = new Date().toISOString().split("T")[0]; // Update upload date to current date

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
    const index = videos.findIndex((vid) => vid.videoId === videoId);

    if (index === -1) {
      return res.status(404).json({ message: "Video not found" });
    }

    videos.splice(index, 1);

    res.status(200).json({ message: "video deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}
