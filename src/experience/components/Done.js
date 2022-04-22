import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  updateShoe,
} from "../features/modelsListSlice";
import { selectShoeList } from "../features/shoeListSlice";

const Done = ({ currentModel, handleDone }) => {
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

    dispatch(updateShoe(resetShoe));
  };

  return (
    <div className={classNames("controls", { visible: currentModel.editing })}>
      <div className="done" onClick={() => handleReset()}>
        Reset
      </div>
      <div className="done" onClick={() => handleDone()}>
        {bag.some((shoe) => shoe.index === currentModel.index)
          ? "Save"
          : "Add to bag"}
      </div>
    </div>
  );
};

export default Done;
