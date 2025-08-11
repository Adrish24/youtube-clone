import { comments } from "../utils/comments.js";

export async function createComment(req, res) {
  const { videoId, userId, handle, text } = req.body;
  try {
    comments.push({
      commentId: Math.floor(100000 + Math.random() * 900000).toString(),
      videoId: videoId,
      userId: userId,
      handle: handle,
      text: text,
      timestamp: new Date(Date.now()),
    });

    const filtredComments = comments.filter(
      (comment) => comment.videoId === videoId
    );

    res.status(201).json({ comments: filtredComments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    res.status(500).json({ error: "Something went wrong!. Try gain later" });
  }
}

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
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

export async function deleteComment(req, res) {
  const { videoId } = req.params;
  const { commentId } = req.query;
  if (!commentId) {
    return res.status(400).json({ message: "commentId requried" });
  }

  try {
    const index = comments.findIndex(
      (comment) => comment.commentId == commentId && comment.videoId === videoId
    );
    if (index === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comments.splice(index, 1);

    // Return the updated list for the video
    const filtredComments = comments.filter(
      (comment) => comment.videoId === videoId
    );

    res.status(200).json({ comments: filtredComments });
  } catch (error) {
    console.log("Error fetching comments:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong!. Try again later." });
  }
}

export async function updateComment(req, res) {}
