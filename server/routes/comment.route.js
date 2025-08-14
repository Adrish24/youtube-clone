import express from "express";

import {
  createComment,
  deleteComment,
  getCommentsById,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/:videoId", getCommentsById);
router.put("/update/:videoId", updateComment);
router.delete("/delete/:videoId", deleteComment);

export default router;
