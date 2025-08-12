import express from "express";

import {
  createComment,
  deleteComment,
  getCommentsById,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:videoId", getCommentsById);
router.put("/:videoId", updateComment);
router.delete("/:videoId", deleteComment);

export default router;
