import express from "express";
import { getVideos } from "../controllers/videos.controller.js";

const router = express.Router();

router.get("/", getVideos);

export default router;
