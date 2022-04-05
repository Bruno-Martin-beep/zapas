import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentShoe,
  editShoe,
  changeCurrentMesh,
  changePrevMesh,
} from "../features/modelsListSlice";
import { HexColorPicker, HexColorInput } from "react-colorful";

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

const Panel = () => {
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);

  const picker = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (picker.current && !picker.current.contains(event.target)) {
        setShowPicker(false)
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [picker])
  
  const handleCopy = () => {
    navigator.clipboard.writeText(currentModel.currentMesh.color);
  };

  const handlePaste = () => {
    const regex =  new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    navigator.clipboard.readText().then((clipText) => {
      if(regex.test(clipText)) {
        handleColor(clipText)
      }
    }); 
  };

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
      <div className="custom-color">
        <div className="color-selector" ref={picker}>
          <div
            className="color-selected"
            style={{ backgroundColor: currentModel.currentMesh.color }}
            onClick={() => setShowPicker((prev) => !prev)}
          />
          <div className={classNames("color-picker", { visible: showPicker })} >
            <HexColorPicker
              color={currentModel.currentMesh.color}
              onChange={handleColor}
            />
          </div>
        </div>
        <HexColorInput
          className="custom-color-input"
          color={currentModel.currentMesh.color}
          onChange={handleColor}
          prefixed
        />
        {/* <input
          type="color"
          value={currentModel.currentMesh.color}
          onChange={(e) => handleColor(e.target.value)}
          className="color-selector"
        /> */}
        <p className="custom-color-copy" onClick={() => handleCopy()}>
          Copy
        </p>
        <p className="custom-color-copy" onClick={() => handlePaste()}>
          Paste
        </p>
      </div>

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
    </div>
  );
};

export default Panel;
