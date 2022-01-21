import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./songSlice";
import webAudioReducer from "./webAudioSlice";

export default configureStore({
  reducer: {
    mySongReducer: songReducer,
    myWebAudioReducer: webAudioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
