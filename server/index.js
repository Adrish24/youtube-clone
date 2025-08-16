import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

// Importing the connectDB function to establish a connection to the MongoDB database
import connectDB from "./config/connectDb.js";

// Importing the logger middleware for logging requests
import logger from "./middleware/logger.js";

// Importing the routes for different functionalities of the YouTube clone application
import videoRoute from "./routes/video.route.js";
import watchRoute from "./routes/watch.route.js";
import commentRoute from "./routes/comment.route.js";
import searchRoute from "./routes/search.route.js";
import authRoute from "./routes/auth.route.js";
import channelRoute from "./routes/channel.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to the YouTube Clone API");
});

// Defining the routes for the application
// Each route corresponds to a specific functionality such as video management, comments, search, and user authentication
app.use("/api/videos", videoRoute);
app.use("/api/watch", watchRoute);
app.use("/api/channel", channelRoute);
app.use("/api/comments", commentRoute);
app.use("/api/search", searchRoute);

// Authentication routes for user login and registration
app.use("/api/auth", authRoute);


async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
    await connectDB(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
}

startServer();
