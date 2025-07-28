import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    items: [], // Initial state with the videos data
  },
  reducers: {
    setVideos: (state, action) => {
      state.items = action.payload;
    },
    clearVideos: (state) => {
      state.items = null;
    },
  },
});

export const { setVideos, clearVideos } = videosSlice.actions;
export default videosSlice.reducer;
