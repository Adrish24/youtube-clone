import express from "express";
import {
  createMyChannel,
  getChannelByhandle,
} from "../controllers/channel.controller.js";

const router = express.Router();

router.post("/create", createMyChannel);
router.get("/:handle", getChannelByhandle);

export default router;
