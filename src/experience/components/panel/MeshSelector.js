import React from 'react'
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
          {"<"}
        </button>
        <div className="mesh-panel-name">
          <h2 className="active">{currentModel.currentMesh.name}</h2>
          <h2>
            {currentModel.currentMesh.index + 1}/{currentModel.meshes.length}
          </h2>
        </div>
        <button
          className="mesh-panel-button"
          onClick={() => handleForwardArrow()}
        >
          {">"}
        </button>
      </div>
  )
}

export default MeshSelector