import express from "express";
import {
  login,
  register,
  switchChannel,
} from "../controllers/auth.controller.js";
import { authorization } from "../middleware/authorization.js";

// Import the validator middleware
// This middleware will validate the request body for required fields
import { validator } from "../middleware/validator.js";

const router = express.Router();

router.post("/register", validator("username", "password", "email"), register);
router.post("/login", validator("password", "email"), login);
router.post(
  "/switch-channel",
  authorization,
  validator("userId", "channelId"),
  switchChannel
);

export default router;
