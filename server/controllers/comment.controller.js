import { comments } from "../utils/comments.js";

export async function getComments(req, res) {
  const { videoId } = req.params;
  try {
    const filtredComments = comments.filter(
      (comment) => comment.videoId === videoId
    );

    if (filtredComments.length === 0) {
      return res.status(404).json({ comments: [] });
    }

    return res.status(200).json({ comments: filtredComments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }
}
