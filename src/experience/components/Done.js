import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShoeList,
  addToList,
  addShoe,
  toggleEditing,
} from "../features/modelsListSlice";
import { nanoid } from "nanoid";

import { PerspectiveCamera } from 'three';

const Done = ({ currentModel, renderer, scene }) => {
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

  const handleDone = () => {
    const camera = new PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 2.5;
    camera.position.y = 0.15;

    renderer.setSize(400, 400);

    renderer.render(scene, camera);

    const image = renderer.domElement.toDataURL("image/webp");

    renderer.setSize(window.innerWidth, window.innerHeight);

    const newShoe = {
      ...currentModel,
      editing: false,
      index: nanoid(),
    };
    dispatch(toggleEditing());
    dispatch(addToList({...currentModel, editing: false, image}));
    dispatch(addShoe(newShoe));
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
