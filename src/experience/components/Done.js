import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShoeList,
  addShoe,
} from "../features/modelsListSlice";

const Done = ({ currentModel, renderer, handleDone }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);

  const handleShare = () => {
    const link = document.createElement("a");
    document.body.appendChild(link); //Firefox requires the link to be in the body
    link.setAttribute("download", currentModel.name);
    link.setAttribute(
      "href",
      renderer.domElement.toDataURL("image/png")
    );
    link.click();
    document.body.removeChild(link);
  };

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

  return (
    <div className={classNames("controls", { visible: currentModel.editing })}>
      <div className="done" onClick={() => handleShare()}>
        Share
      </div>
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
