import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice";
import videosSlice from "../videosSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    videos: videosSlice,
  },
});

export default store;
