import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Slice Object
///////////////////////////////////////

let initialState: {
  isvisible: boolean;
  mousePosition: [number, number];
  color: string;
} = {
  isvisible: false,
  mousePosition: [0, 0],
  color: "",
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    activeDialog: (state) => {
      state.isvisible = true;
    },
    desableDialog: (state) => {
      state.isvisible = false;
    },
    changeMousePosition: (state, action: PayloadAction<[number, number]>) => {
      state.mousePosition = action.payload;
    },
    changeColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },

  },
});

// Selectors
///////////////////////////////////////

export const selectDialogIsVisible = (state: RootState) =>
  state.dialog.isvisible;

export const selectMousePosition = (state: RootState) => state.dialog.mousePosition;
export const selectDialogColor = (state: RootState) => state.dialog.color;

// Exports
///////////////////////////////////////

export const { activeDialog, desableDialog, changeMousePosition, changeColor } =
  dialogSlice.actions;

export default dialogSlice.reducer;
