import express from "express";
import {
  login,
  register,
  switchChannel,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/switch-channel", switchChannel);

export default router;
