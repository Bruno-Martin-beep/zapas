import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Slice Object
///////////////////////////////////////

export interface Mesh {
  name: string;
  color: string;
  index: number;
}

export interface StandardModel {
  name: string;
  price: number;
  size: number;
  editing: boolean;
  meshes: Mesh[];
  currentMesh: number;
  prevMesh: Mesh;
  image: string;
  index: string;
}

let initialState: StandardModel[] = [];

export const shoeListSlice = createSlice({
  name: "shoeList",
  initialState,
  reducers: {
    addShoe: (state, action: PayloadAction<StandardModel>) => {
      if (state.some((shoe) => shoe.index === action.payload.index)) {
        const index = state.findIndex(
          (shoe) => shoe.index === action.payload.index
        );
        state[index] = action.payload;
      } else {
        state = [...state, action.payload];
      }
      return state
    },
    removeShoe: (state, action: PayloadAction<StandardModel>) => {
      const index = state.findIndex(
        (Shoe) => Shoe.index === action.payload.index
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

export const selectShoeList = (state: RootState) => state.shoeList;

// Exports
///////////////////////////////////////

export const { addShoe, removeShoe, clearList } = shoeListSlice.actions;

export default shoeListSlice.reducer;
