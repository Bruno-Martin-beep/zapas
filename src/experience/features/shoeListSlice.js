import { createSlice } from "@reduxjs/toolkit";

// Slice Object
///////////////////////////////////////

export const shoeListSlice = createSlice({
  name: "shoeList",
  initialState: [],
  reducers: {
    addShoe: (state, action) => {
      if (state.some((elem) => elem.index === action.payload.index)) {
        const index = state.findIndex(
          (elem) => elem.index === action.payload.index
        );
        state[index] = action.payload;
      } else {
        state = [...state, action.payload];
      }
      return state
    },
    removeShoe: (state, action) => {
      const index = state.findIndex(
        (elem) => elem.index === action.payload.index
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

export const selectShoeList = (state) => state.shoeList;

// Exports
///////////////////////////////////////

export const { addShoe, removeShoe, clearList } = shoeListSlice.actions;

export default shoeListSlice.reducer;
