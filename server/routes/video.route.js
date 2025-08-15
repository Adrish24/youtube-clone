import express from "express";
import {
  deleteVideo,
  getVideosByCategory,
  updateVideo,
  uploadVideo,
} from "../controllers/videos.controller.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

router.post("/upload", authorization, uploadVideo);
router.get("/", getVideosByCategory);
router.put("/update/:videoId", authorization, updateVideo);
router.delete("/delete/:videoId", authorization, deleteVideo);

export default router;
