import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlistSlice",
  initialState: {
    songs: [],
    isReady: false,
  },
  reducers: {
    setPlayList: (state, action) => {
      state.songs = action.payload;
    },
    change: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // console.log(state);
      // console.log(action);
    },
    addSong: (state, action) => {
      if (!state.isReady) state.songs.push(action.payload);
      // console.log("Obecny stan");
      // console.log(state.songs.length);
    },
    deleteSong: (state, action) => {
      state.songs.shift();
    },
    setReady: (state, action) => {
      state.isReady = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change, addSong, deleteSong, setPlayList, setReady } =
  playlistSlice.actions;

export default playlistSlice.reducer;
