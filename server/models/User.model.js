import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    channels: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Channel",
      default: [],
    },
    activeChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      default: null,
    },
  },
  { timestamps: true } // <-- Add this option to automatically manage createdAt and updatedAt fields
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
