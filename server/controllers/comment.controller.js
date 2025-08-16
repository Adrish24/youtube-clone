import Comment from "../models/Comment.model.js";

export async function createComment(req, res) {
  const { videoId, channelId, handle, text } = req.body;

  try {
    // Create a new comment in the database
    await Comment.create({
      videoId,
      channelId,
      handle,
      text,
    });

    // Fetch all comments for the video
    const comments = await Comment.find({ videoId }).sort({
      createdAt: -1,
    });

    res.status(201).json({ comments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    res.status(500).json({ error: "Something went wrong!. Try gain later" });
  }
}

// This function fetches comments for a specific video by its ID
// It returns the comments in descending order of creation date
export async function getCommentsByVideoId(req, res) {
  const { videoId } = req.params;

  try {
    // Fetch comments from the database
    const comments = await Comment.find({ videoId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ comments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

export async function deleteComment(req, res) {
  const { videoId } = req.params;
  const { commentId } = req.query;
  if (!commentId) {
    return res.status(400).json({ message: "commentId missing" });
  }

  try {
    // Find the comment by ID and delete it
    await Comment.findByIdAndDelete(commentId);

    // Fetch all comments for the video
    const comments = await Comment.find({ videoId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ comments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}

export async function updateComment(req, res) {
  const { videoId } = req.params;
  const { commentId } = req.query;
  const { text } = req.body;

  if (!commentId) {
    return res.status(400).json({ message: "commentId missing" });
  }

  try {
    await Comment.findByIdAndUpdate(commentId, {
      $set: { text },
    });

    // Fetch all comments for the video
    const comments = await Comment.find({ videoId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ comments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong!. Try again later." });
  }
}
