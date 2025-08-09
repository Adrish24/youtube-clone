import { videos } from "../utils/videos.js";

export async function searchVideos(req, res) {
  const { q } = req.query;
  try {
    if (!q || q === "") {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }
    
    const results = videos.filter((vid) =>
      vid.title.toLowerCase().includes(q.toLowerCase())
    );
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
