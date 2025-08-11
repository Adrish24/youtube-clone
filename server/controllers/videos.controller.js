import { videos } from "../utils/videos.js";

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
