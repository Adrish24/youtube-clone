import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    data: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
