import express from "express";
import {
  deleteVideo,
  getVideosByCategory,
  updateVideo,
  uploadVideo,
} from "../controllers/videos.controller.js";
import { authorization } from "../middleware/authorization.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();

router.post(
  "/upload",
  authorization,
  validator("title", "category", "description", "videoUrl", "thumbnailUrl"),
  uploadVideo
);
router.get("/", getVideosByCategory);
router.put(
  "/update/:videoId",
  authorization,
  validator("title", "category", "description", "videoUrl", "thumbnailUrl"),
  updateVideo
);
router.delete("/delete/:videoId", authorization, deleteVideo);

export default router;
