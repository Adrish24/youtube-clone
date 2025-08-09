import { videos } from "../utils/videos.js";

export async function getWatchVideoData(req, res) {
  const { videoId } = req.params;

  try {
    const currentVideo = videos.find((vid) => vid.videoId === videoId);
    const suggestedVideos = videos.filter((vid) => vid.videoId !== videoId);

    if (!currentVideo) {
      return res.status(404).send("video not found");
    }

    return res.status(200).json({ currentVideo, suggestedVideos });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching video data");
  }
}
