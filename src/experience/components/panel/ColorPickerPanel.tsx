import React, { useState } from "react";
import "./colorPickerPanel.scss"
import { HexColorInput } from "react-colorful";
import ColorsControls from "../ColorsControls";
import HexColorPickerPanel from "./HexColorPickerPanel";
import { useSelector } from "react-redux";
import { selectCurrentShoe } from "../../features/modelsListSlice";

const ColorPickerPanel = ({ handleColor }:  { handleColor: Function }) => {
  const currentModel = useSelector(selectCurrentShoe);
  const [open, setOpen] = useState<Function>(() => {});

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
        <HexColorPickerPanel setOpen={setOpen} handleColor={handleColor} />
      </div>
      <HexColorInput
        className="hexColorInput-panel"
        color={currentModel?.currentMesh.color}
        onChange={(color) => handleColor(color)}
        prefixed
      />
      <ColorsControls className="colors-controls-panel" color={currentModel?.currentMesh.color} />
    </div>
  );
};

export default ColorPickerPanel;
