import express from "express";

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:videoId", getComments);
router.put("/:videoId", updateComment);
router.delete("/:videoId", deleteComment);

export default router;
