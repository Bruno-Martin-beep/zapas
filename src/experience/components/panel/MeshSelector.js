import React from "react";
import "./meshSelector.scss";
import { useDispatch } from "react-redux";
import {
  changeCurrentMesh,
  changePrevMesh,
} from "../../features/modelsListSlice";

const MeshSelector = ({ currentModel }) => {
  const dispatch = useDispatch();

  const handleBackArrow = () => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    currentModel.currentMesh.index === 0
      ? dispatch(changeCurrentMesh(currentModel.meshes.length - 1))
      : dispatch(changeCurrentMesh(currentModel.currentMesh.index - 1));
  };

  const handleForwardArrow = () => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    currentModel.currentMesh.index >= currentModel.meshes.length - 1
      ? dispatch(changeCurrentMesh(0))
      : dispatch(changeCurrentMesh(currentModel.currentMesh.index + 1));
  };

  return (
    <div className="mesh-panel">
      <button className="mesh-panel-button" onClick={() => handleBackArrow()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M28.05 36 16 23.95 28.05 11.9 30.2 14.05 20.3 23.95 30.2 33.85Z" />
        </svg>
      </button>
      <div className="mesh-panel-name">
        <h2 className="active">{currentModel?.currentMesh.name}</h2>
        <h2>
          {currentModel?.currentMesh.index + 1}/{currentModel?.meshes.length}
        </h2>
      </div>
      <button
        className="mesh-panel-button"
        onClick={() => handleForwardArrow()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M18.75 36 16.6 33.85 26.5 23.95 16.6 14.05 18.75 11.9 30.8 23.95Z" />
        </svg>
      </button>
    </div>
  );
};

export default MeshSelector;
