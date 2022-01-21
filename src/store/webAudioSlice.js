import { createSlice } from "@reduxjs/toolkit";

export const webAudioSlice = createSlice({
  name: "webAudio",
  initialState: {
    webAudioContext: new AudioContext(),
  },
  reducers: {
    changeCtx: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.webAudioContext = action.payload.newContext;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = webAudioSlice.actions;

export default webAudioSlice.reducer;
