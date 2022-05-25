import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

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
    addList: (state, action : PayloadAction<string[]>) => {
      state = [...action.payload];
      return state;
    },
    clearList: (state) => {
      state = [];
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectcolorsList = (state: RootState) => state.colorsList;

// Exports
///////////////////////////////////////

export const { addColor, removeColor, addList, clearList } = colorsListSlice.actions;

export default colorsListSlice.reducer;
