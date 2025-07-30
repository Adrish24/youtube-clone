import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    items: [], // Initial state with the videos data
    isLoading: true, // Indicates if the videos are being fetched
    error: null, // Holds any error that occurs during fetching
  },
  reducers: {
    setVideos: (state, action) => {
      state.items = action.payload;
    },
    clearVideos: (state) => {
      state.items = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setVideos, clearVideos, setIsLoading, setError } =
  videosSlice.actions;
export default videosSlice.reducer;
