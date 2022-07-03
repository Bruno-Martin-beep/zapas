import { configureStore } from "@reduxjs/toolkit";
import shoeListSlice from "./experience/features/shoeListSlice";
import modelsListSlice from "./experience/features/modelsListSlice";
import colorsListSlice from "./experience/features/colorsListSlice";
import contextMenuSlice from "./experience/features/contextMenuSlice";
import removeShoeSlice from "./experience/features/removeShoeSlice";

const store = configureStore({
  reducer: {
    shoeList: shoeListSlice,
    modelsList: modelsListSlice,
    colorsList: colorsListSlice,
    contextMenu: contextMenuSlice,
    removeShoe: removeShoeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store