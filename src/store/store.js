import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./songSlice";
import webAudioReducer from "./webAudioSlice";
import playlistReducer from "./playlistSlice";

export default configureStore({
  reducer: {
    mySongReducer: songReducer,
    myWebAudioReducer: webAudioReducer,
    myPlayListReducer: playlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
