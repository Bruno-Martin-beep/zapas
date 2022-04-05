import { createSlice } from "@reduxjs/toolkit";

// Slice Object
///////////////////////////////////////

export const baseModelsSlice = createSlice({
  name: "baseModels",
  initialState: [
    {
      name: "super shoe",
      meshes: [
        { name: "caps", geometry: {}, material: {} },
        { name: "patch", geometry: {}, material: {} },
        { name: "laces", geometry: {}, material: {} },
        { name: "mesh", geometry: {}, material: {} },
        { name: "inner", geometry: {}, material: {} },
        { name: "sole", geometry: {}, material: {} },
        { name: "stripes", geometry: {}, material: {} },
        { name: "band", geometry: {}, material: {} },
      ],
    },
  ],
  reducers: {
    addModel: (state, action) => {
      return state = [ ...state, action.payload ];
    },
    clearBaseModels: (state) => {
      state = [];
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectBaseModels = (state) => state.baseModels;

// Exports
///////////////////////////////////////

export const { addModel, clearBaseModels } = baseModelsSlice.actions;

export default baseModelsSlice.reducer;
