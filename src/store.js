import { configureStore } from "@reduxjs/toolkit";
import shoeListSlice from "./experience/features/shoeListSlice";
import modelsListSlice from "./experience/features/modelsListSlice";

export default configureStore({
  reducer: {
    shoeList: shoeListSlice,
    modelsList: modelsListSlice,
  },
});
