import express from "express";
import {
  createMyChannel,
  getChannelByhandle,
} from "../controllers/channel.controller.js";
import { authorization } from "../middleware/authorization.js";
import { validator } from "../middleware/validator.js";

const router = express.Router();

router.post(
  "/create",
  authorization,
  validator("name", "handle"),
  createMyChannel
);
router.get("/:handle", getChannelByhandle);

export default router;
