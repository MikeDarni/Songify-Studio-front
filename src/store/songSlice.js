import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "songSlice",
  initialState: {
    song: {
      id: 0,
      Author: "",
      Name: "",
    },
  },
  reducers: {
    change: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.song.id = action.payload.id;
      state.song.Author = action.payload.Author;
      state.song.Name = action.payload.Name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = songSlice.actions;

export default songSlice.reducer;
