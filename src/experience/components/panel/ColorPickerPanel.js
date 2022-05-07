import React, { useState } from "react";
import "./colorPickerPanel.scss"
import { HexColorInput } from "react-colorful";
import ColorsControls from "../ColorsControls";
import HexColorPickerPanel from "./HexColorPickerPanel";

const ColorPickerPanel = ({ currentModel, handleColor }) => {
  const [open, setOpen] = useState(() => {});

  const handlePicker = () => {
    open();
  };

  return (
    <div className="custom-color">
      <div className="color-selector">
        <div
          className="color-selected"
          style={{ backgroundColor: currentModel?.currentMesh.color }}
          onClick={() => handlePicker()}
        />
        <HexColorPickerPanel setOpen={setOpen} currentModel={currentModel} handleColor={handleColor} />
      </div>
      <HexColorInput
        className="hexColorInput-panel"
        color={currentModel?.currentMesh.color}
        onChange={handleColor}
        prefixed
      />
      <ColorsControls className="colors-controls-panel" color={currentModel?.currentMesh.color} />
    </div>
  );
};

export default ColorPickerPanel;
