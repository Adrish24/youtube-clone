import express from "express";

import { getComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:videoId", getComments);

export default router;
