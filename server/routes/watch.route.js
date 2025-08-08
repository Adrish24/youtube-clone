import express from "express";
import { getWatchVideoData } from "../controllers/watch.controller.js";

const router = express.Router();

router.get("/:videoId", getWatchVideoData);

export default router;
