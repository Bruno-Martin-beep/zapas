import { createSlice } from "@reduxjs/toolkit";

// Slice Object
///////////////////////////////////////

export const modelsListSlice = createSlice({
  name: "modelsList",
  initialState: null,
  reducers: {
    updateShoe: (state, action) => {
      state = {
        ...action.payload,
        currentMesh: 0,
        prevMesh: action.payload.meshes[0],
      };
      return state
    },
    editShoe: (state, action) => {
      state.meshes[action.payload.index].color =
        action.payload.color;
    },
    editSize: (state, action) => {
      state.size = action.payload;
    },
    toggleEditing: (state) => {
      state.editing = !state.currentShoe.editing;
    },
    changeCurrentMesh: (state, action) => {
      state.currentMesh = action.payload;
    },
    changePrevMesh: (state, action) => {
      state.prevMesh = action.payload;
    },
  },
});

// Selectors
///////////////////////////////////////

export const selectCurrentShoe = (state) => {
  const currentShoe = state.modelsList;

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
  updateShoe,
  editShoe,
  editSize,
  toggleEditing,
  changeCurrentMesh,
  changePrevMesh,
} = modelsListSlice.actions;

export default modelsListSlice.reducer;
