import { createSlice } from "@reduxjs/toolkit";

// Slice Object
///////////////////////////////////////

export const colorsListSlice = createSlice({
  name: "colorsList",
  initialState: [],
  reducers: {
    addColor: (state, action) => {
      if (!state.some((color) => color === action.payload)) {
        state = [action.payload, ...state];
      }
      return state;
    },
    removeColor: (state, action) => {
      const index = state.findIndex(
        (elem) => elem === action.payload
      );
      state.splice(index, 1);
    },
    clearList: (state) => {
      state = [];
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectcolorsList = (state) => state.colorsList;

// Exports
///////////////////////////////////////

export const { addColor, removeColor, clearList } = colorsListSlice.actions;

export default colorsListSlice.reducer;
