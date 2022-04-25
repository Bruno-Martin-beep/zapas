import React, { useState } from "react";
import { HexColorInput } from "react-colorful";
import HexColorPickerPanel from "./HexColorPickerPanel";

const ColorPickerPanel = ({ currentModel, handleColor }) => {
  const [open, setOpen] = useState(() => {});

  const handlePicker = () => {
    open();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentModel.currentMesh.color);
  };

  const handlePaste = () => {
    const regex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    navigator.clipboard.readText().then((clipText) => {
      if (regex.test(clipText)) {
        handleColor(clipText);
      }
    });
  };

  return (
    <div className="custom-color">
      <div className="color-selector">
        <div
          className="color-selected"
          style={{ backgroundColor: currentModel.currentMesh.color }}
          onClick={() => handlePicker()}
        />
        <HexColorPickerPanel setOpen={setOpen} currentModel={currentModel} handleColor={handleColor} />
      </div>
      <HexColorInput
        className="custom-color-input"
        color={currentModel.currentMesh.color}
        onChange={handleColor}
        prefixed
      />
      <p className="custom-color-copy" onClick={() => handleCopy()}>
        Copy
      </p>
      <p className="custom-color-copy" onClick={() => handlePaste()}>
        Paste
      </p>
    </div>
  );
};

export default ColorPickerPanel;
