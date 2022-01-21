import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "songSlice",
  initialState: {
    song: {
      url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_09_-_Homeroad.mp3",
      Author: "",
      songName: "",
    },
  },
  reducers: {
    change: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(state);
      console.log(action);
      state.song.url = action.payload.url;
      state.song.Author = action.payload.Author;
      state.song.songName = action.payload.Name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = songSlice.actions;

export default songSlice.reducer;
