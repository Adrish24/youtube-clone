import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import connectDB from "./config/connectDb.js";

import logger from "./middleware/logger.js";
import videoRoute from "./routes/video.route.js";
import watchRoute from "./routes/watch.route.js";
import commentRoute from "./routes/comment.route.js";
import searchRoute from "./routes/search.route.js";
import authRoute from "./routes/auth.route.js";
import channelRoute from "./routes/channel.route.js";

import Video from "./models/Video.model.js";
import { videos } from "./utils/videos.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to the YouTube Clone API");
});

app.use("/api/videos", videoRoute);
app.use("/api/watch", watchRoute);
app.use("/api/channel", channelRoute);

app.use("/api/auth", authRoute);

app.use("/api/comments", commentRoute);
app.use("/api/search", searchRoute);

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
    await connectDB(process.env.MONGODB_URI);
    // await insertData();
  } catch (error) {
    console.log(error);
  }
}

startServer();

// async function insertData() {
//   try {
//     await Video.deleteMany(); // Clear existing users
//     await Video.insertMany(videos);
//   } catch (error) {
//     console.log("Error inserting data:", error);
//   }
// }
