import mongoose from "mongoose";

async function connectDB(url) {
  if (!url) {
    console.log("mongodb uri not found");
    return;
  }
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
