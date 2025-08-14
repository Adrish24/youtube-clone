import express from "express";
import {
  deleteVideo,
  getVideos,
  updateVideo,
  uploadVideo,
} from "../controllers/videos.controller.js";

const router = express.Router();

router.post("/upload", uploadVideo);
router.get("/", getVideos);
router.put("/update/:videoId", updateVideo);
router.delete("/delete/:videoId", deleteVideo);

export default router;
