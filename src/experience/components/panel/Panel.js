import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentShoe,
  editShoe,
  editSize,
  changeCurrentMesh,
  changePrevMesh,
} from "../../features/modelsListSlice";
import ColorPickerPanel from "./ColorPickerPanel";

const colors = [
  "#cd5c5c",
  "#4682B4",
  "#FFF8DC",
  "#7FFF00",
  "#663399",
  "#FFD700",
  "#FFE764",
  "#ffff82",
  "#32CD32",
  "#9370DB",
  "#6A5ACD",
  "#000000",
];

const sizes = [39, 40, 41, 42, 43, 44, 45, 46];

const Panel = () => {
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const handleColor = (color) => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    dispatch(
      editShoe({
        index: currentModel.currentMesh.index,
        color: color,
      })
    );
  };

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

  const handleSize = (number) => {
    dispatch(editSize(number));
  };

  return (
    <div className={classNames("panel", { visible: currentModel.editing })}>
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
      <ColorPickerPanel />
      <div className="selectors">
        {colors.map((elem, index) => {
          return (
            <div
              key={index}
              onClick={() => handleColor(elem)}
              style={{ backgroundColor: elem }}
              className="select-color"
            />
          );
        })}
      </div>
      <div className="sizes">
        <h2>sizes</h2>
        <div className="sizes-numbers">
          {sizes.map((elem, index) => {
            return (
              <h2
                key={index}
                onClick={() => handleSize(elem)}
                className={classNames({
                  numberSelected: elem === currentModel.size,
                })}
              >
                {elem}
              </h2>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Panel;
