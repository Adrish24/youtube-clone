import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: { type: String, required: true, unique: true },
    handle: { type: String, required: true, unique: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, default: "" },
    channelBanner: { type: String, default: "" },
    avatar: { type: String, default: "" },
    subscribers: {
      type: Number,
      default: 0,
      min: 0,
    },
    videos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Video",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const channelModel = mongoose.model("Channel", channelSchema);

export default channelModel;
