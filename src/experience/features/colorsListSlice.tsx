import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import colors from "../mocks/defaultColors";

// Slice Object
///////////////////////////////////////

let initialState: string[] = [];

export const colorsListSlice = createSlice({
  name: "colorsList",
  initialState,
  reducers: {
    addColor: (state, action: PayloadAction<string>) => {
      if (!state.some((color) => color === action.payload)) {
        state = [action.payload, ...state];
      }
      return state;
    },
    removeColor: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((color) => color === action.payload);
      state.splice(index, 1);
    },
    addColorList: (state, action: PayloadAction<string[]>) => {
      state = [...action.payload];
      return state;
    },
    resetColorList: (state) => {
      state = colors;
      return state;
    },
    clearColorList: (state) => {
      state = [];
      return state;
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectcolorsList = (state: RootState) => state.colorsList;

// Exports
///////////////////////////////////////

export const {
  addColor,
  removeColor,
  addColorList,
  resetColorList,
  clearColorList,
} = colorsListSlice.actions;

export default colorsListSlice.reducer;
