import { configureStore } from "@reduxjs/toolkit";
import shoeListSlice from "./experience/features/shoeListSlice";
import modelsListSlice from "./experience/features/modelsListSlice";
import colorsListSlice from "./experience/features/colorsListSlice";

export default configureStore({
  reducer: {
    shoeList: shoeListSlice,
    modelsList: modelsListSlice,
    colorsList: colorsListSlice,
  },
});
