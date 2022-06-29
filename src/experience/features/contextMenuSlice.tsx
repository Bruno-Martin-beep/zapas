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

export const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState,
  reducers: {
    activeContextMenu: (state) => {
      state.isvisible = true;
    },
    desableContextMenu: (state) => {
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
  state.contextMenu.isvisible;

export const selectMousePosition = (state: RootState) => state.contextMenu.mousePosition;
export const selectDialogColor = (state: RootState) => state.contextMenu.color;

// Exports
///////////////////////////////////////

export const { activeContextMenu, desableContextMenu, changeMousePosition, changeColor } =
contextMenuSlice.actions;

export default contextMenuSlice.reducer;
