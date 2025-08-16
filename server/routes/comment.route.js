import express from "express";

import {
  createComment,
  deleteComment,
  getCommentsByVideoId,
  updateComment,
} from "../controllers/comment.controller.js";
import { authorization } from "../middleware/authorization.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();

router.post(
  "/create",
  authorization,
  validator("videoId", "channelId", "handle", "text"),
  createComment
);
router.get("/:videoId", getCommentsByVideoId);
router.put(
  "/update/:videoId",
  authorization,
  validator("text"),
  updateComment
);
router.delete("/delete/:videoId", authorization, deleteComment);

export default router;
