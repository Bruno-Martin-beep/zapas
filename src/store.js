import { configureStore } from "@reduxjs/toolkit";
import baseModelsSlice from "./experience/features/baseModelsSlice";
import modelsListSlice from "./experience/features/modelsListSlice";

export default configureStore({
  reducer: {
    baseModels: baseModelsSlice,
    modelsList: modelsListSlice,
  },
});
