import { configureStore } from "@reduxjs/toolkit";
import shoeListSlice from "./experience/features/shoeListSlice";
import modelsListSlice from "./experience/features/modelsListSlice";
import colorsListSlice from "./experience/features/colorsListSlice";
import contextMenuSlice from "./experience/features/contextMenuSlice";

const store = configureStore({
  reducer: {
    shoeList: shoeListSlice,
    modelsList: modelsListSlice,
    colorsList: colorsListSlice,
    contextMenu: contextMenuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store