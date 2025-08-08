import express from "express";
import cors from "cors";
import { videos } from "./utils/videos.js";

import logger from "./middleware/logger.js";
import watchRoute from "./routes/watch.route.js";
import commentRoute from "./routes/comment.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(logger);

app.get("/", (req, res) => {
  try {
    res.status(200).send({ videos });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/watch", watchRoute);
app.use("/comments", commentRoute);

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

startServer();
