import express from "express";
import {
  createMyChannel,
  getChannelByhandle,
} from "../controllers/channel.controller.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

router.post("/create", authorization, createMyChannel);
router.get("/:handle", getChannelByhandle);

export default router;
