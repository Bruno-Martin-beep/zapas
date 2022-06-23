import { configureStore } from "@reduxjs/toolkit";
import shoeListSlice from "./experience/features/shoeListSlice";
import modelsListSlice from "./experience/features/modelsListSlice";
import colorsListSlice from "./experience/features/colorsListSlice";
import dialogSlice from "./experience/features/dialogSlice";

const store = configureStore({
  reducer: {
    shoeList: shoeListSlice,
    modelsList: modelsListSlice,
    colorsList: colorsListSlice,
    dialog: dialogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store