import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice";
import videosSlice from "../videosSlice";
import commentSlice from "../commentSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    videos: videosSlice,
    comments: commentSlice,
  },
});

export default store;
