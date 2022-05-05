import React from "react";
import "./done.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentShoe,
  updateShoe,
} from "../features/modelsListSlice";

const Done = () => {
  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

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
    </div>
  );
};

export default Done;
