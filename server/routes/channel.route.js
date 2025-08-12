import express from "express";
import { getChannelByhandle } from "../controllers/channel.controller.js";

const router = express.Router();

router.get("/:handle", getChannelByhandle);

export default router;
