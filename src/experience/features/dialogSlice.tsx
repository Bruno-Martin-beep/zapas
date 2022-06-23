import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { RootState } from "../../store";

// Slice Object
///////////////////////////////////////

let initialState: { isvisible: boolean; jsx: ReactElement } = {
  isvisible: false,
  jsx: <></>,
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
    changeDialog: (state, action: PayloadAction<ReactElement>) => {
      state.jsx = action.payload;
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectDialogIsVisible = (state: RootState) => state.dialog.isvisible;
export const selectDialogJsx = (state: RootState) => state.dialog.jsx;

// Exports
///////////////////////////////////////

export const { activeDialog, desableDialog, changeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
