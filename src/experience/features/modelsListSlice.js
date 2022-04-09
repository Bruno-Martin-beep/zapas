import { createSlice } from "@reduxjs/toolkit";

// Slice Object
///////////////////////////////////////

export const modelsListSlice = createSlice({
  name: "modelsList",
  initialState: {
    shoeList: [],
    currentShoe: null,
  },
  reducers: {
    addToList: (state, action) => {
      if (
        state.shoeList.some((elem) => elem.index === action.payload.index)
      ) {
        const index = state.shoeList.findIndex(
          (elem) => elem.index === action.payload.index
        );
        state.shoeList[index] = action.payload;
      } else {
        state.shoeList = [...state.shoeList, action.payload];
      }
    },
    removeShoe: (state, action) => {
      const index = state.shoeList.findIndex(
        (elem) => elem.index === action.payload.index
      );
      state.shoeList.splice(index, 1);
    },
    addShoe: (state, action) => {
      state.currentShoe = {
        ...action.payload,
        currentMesh: 0,
        prevMesh: action.payload.meshes[0],
      };
    },
    editShoe: (state, action) => {
      state.currentShoe.meshes[action.payload.index].color =
        action.payload.color;
    },
    editSize: (state, action) => {
      state.currentShoe.size = action.payload;
    },
    toggleEditing: (state) => {
      state.currentShoe.editing = !state.currentShoe.editing;
    },
    changeCurrentMesh: (state, action) => {
      state.currentShoe.currentMesh = action.payload;
    },
    changePrevMesh: (state, action) => {
      state.currentShoe.prevMesh = action.payload;
    },
    clearModelsList: (state) => {
      state = [];
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectShoeList = (state) => state.modelsList.shoeList;

export const selectCurrentShoe = (state) => {
  const currentShoe = state.modelsList.currentShoe;

  if (currentShoe === null) {
    return null;
  }

  return {
    ...currentShoe,
    currentMesh: currentShoe.meshes[currentShoe.currentMesh],
  };
};

// Exports
///////////////////////////////////////

export const {
  addToList,
  removeShoe,
  addShoe,
  editShoe,
  editSize,
  toggleEditing,
  changeCurrentMesh,
  changePrevMesh,
  clearModelsList,
} = modelsListSlice.actions;

export default modelsListSlice.reducer;
