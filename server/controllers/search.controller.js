import Video from "../models/Video.model.js";

export async function searchVideos(req, res) {
  const { q } = req.query;
  if (!q || q === "") {
    return res.status(400).json({ message: "Search query cannot be empty" });
  }
  try {
    // Use regex to search in title, category, description, and channelName
    const results = await Video.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { channelName: { $regex: q, $options: "i" } },
      ],
    });

    // If no results found, return a 404 status
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
