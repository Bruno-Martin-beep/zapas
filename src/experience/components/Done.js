import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {  selectShoeList, addToList, addShoe, toggleEditing } from "../features/modelsListSlice";
import { nanoid } from "nanoid";

const Done = ({ currentModel }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);

  const handleReset = () => {
    const resetShoe = {
      ...currentModel,
      meshes: currentModel.meshes.map((mesh) => {
        return {
          ...mesh,
          color: "#ffffff",
        };
      }),
    };

    dispatch(addShoe(resetShoe));
  };

  const handleDone = () => {
    const newShoe = {
      ...currentModel,
      editing: false,
      index: nanoid(),
    };
    dispatch(toggleEditing());
    dispatch(addToList());
    dispatch(addShoe(newShoe));
  };

  return (
    <div className={classNames("controls", { visible: currentModel.editing })}>
      <div className="done" onClick={() => handleReset()}>
        Reset
      </div>
      <div className="done" onClick={() => handleDone()}>
        {bag.some((shoe) => shoe.index === currentModel.index) ? "Save" : "Add to bag"}
      </div>
    </div>
  );
};

export default Done;
