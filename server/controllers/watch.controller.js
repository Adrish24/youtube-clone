import Video from "../models/Video.model.js";

// Function to get video data for watch page
// This function retrieves the current video and suggested videos for the watch page
export async function getWatchVideoData(req, res) {
  const { videoId } = req.params;

  try {
    // Check if videoId is provided
    const currentVideo = await Video.findById(videoId);

    // Fetch suggested videos excluding the current video
    const suggestedVideos = await Video.find({
      _id: { $ne: videoId }, // Exclude the current video
    })
      .sort({ createdAt: -1 })
      .limit(10);

    if (!currentVideo) {
      return res.status(404).json({ message: "video not found" });
    }

    return res.status(200).json({ currentVideo, suggestedVideos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
