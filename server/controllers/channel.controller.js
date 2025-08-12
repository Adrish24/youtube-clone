import { channels } from "../utils/channels.js";
import { videos } from "../utils/videos.js";

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
      .json({ error: "Something went wrong!. Try again later." });
  }
}
