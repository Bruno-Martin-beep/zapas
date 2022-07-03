import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Slice Object
///////////////////////////////////////

interface Info {
  mousePosition: [number, number];
  shoeID: string;
}

let initialState: {
  isvisible: boolean;
  info: Info
} = {
  isvisible: false,
  info:{
    mousePosition: [0, 0],
    shoeID: "",
  }
};

export const removeShoeSlice = createSlice({
  name: "removeShoe",
  initialState,
  reducers: {
    activeDialogRemoveShoe: (state) => {
      state.isvisible = true;
    },
    desableDialogRemoveShoe: (state) => {
      state.isvisible = false;
    },
    changeRemoveShoeInfo: (state, action: PayloadAction<Info>) => {
      state.info = action.payload;
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectRemoveShoeIsVisible = (state: RootState) =>
  state.removeShoe.isvisible;
export const selectRemoveShoeInfo = (state: RootState) =>
  state.removeShoe.info;


// Exports
///////////////////////////////////////

export const { activeDialogRemoveShoe, desableDialogRemoveShoe, changeRemoveShoeInfo } =
  removeShoeSlice.actions;

export default removeShoeSlice.reducer;
