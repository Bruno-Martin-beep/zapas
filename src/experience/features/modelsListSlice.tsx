import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Mesh } from "./shoeListSlice";

// Slice Object
///////////////////////////////////////

export interface Model {
  name: string;
  price: number;
  size: number;
  editing: boolean;
  meshes: Mesh[];
  currentMesh: Mesh;
  prevMesh: Mesh;
  index: string;
}

export interface RootModel {
  name: string;
  price: number;
  size: number;
  editing: boolean;
  meshes: Mesh[];
  currentMesh: number;
  prevMesh: Mesh;
  index: string;
}

let initialState: RootModel = {
  name: "super shoe",
  price: 100,
  size: 39,
  editing: false,
  meshes: [
    { name: "caps", color: "#ffffff", index: 0 },
    { name: "patch", color: "#ffffff", index: 1 },
    { name: "laces", color: "#ffffff", index: 2 },
    { name: "mesh", color: "#ffffff", index: 3 },
    { name: "inner", color: "#ffffff", index: 4 },
    { name: "sole", color: "#ffffff", index: 5 },
    { name: "stripes", color: "#ffffff", index: 6 },
    { name: "band", color: "#ffffff", index: 7 },
  ],
  currentMesh: 0,
  prevMesh: { name: "caps", color: "#ffffff", index: 0 },
  index: "",
};

export const modelsListSlice = createSlice({
  name: "modelsList",
  initialState,
  reducers: {
    updateShoe: (state, action: PayloadAction<RootModel>) => {
      state = {
        ...action.payload,
      };
      return state;
    },
    editShoe: (state, action: PayloadAction<{color: string, index: number}>) => {
      state.meshes[action.payload.index].color = action.payload.color;
    },
    editSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    changeCurrentMesh: (state, action:  PayloadAction<number>) => {
      state.currentMesh = action.payload;
    },
    changePrevMesh: (state, action: PayloadAction<Mesh>) => {
      state.prevMesh = action.payload;
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectCurrentShoe = (state: RootState): Model => {
  const currentShoe = state.modelsList;

  return {
    ...currentShoe,
    currentMesh: currentShoe.meshes[currentShoe.currentMesh],
  };
};

// Exports
///////////////////////////////////////

export const {
  updateShoe,
  editShoe,
  editSize,
  changeCurrentMesh,
  changePrevMesh,
} = modelsListSlice.actions;

export default modelsListSlice.reducer;
