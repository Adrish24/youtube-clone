import Video from "../models/Video.model.js";

export async function getWatchVideoData(req, res) {
  const { videoId } = req.params;

  try {
    const currentVideo = await Video.findById(videoId);
    const suggestedVideos = await Video.find({
      _id: { $ne: videoId }, // Exclude the current video
    });

    if (!currentVideo) {
      return res.status(404).json({ message: "video not found" });
    }

    return res.status(200).json({ currentVideo, suggestedVideos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
