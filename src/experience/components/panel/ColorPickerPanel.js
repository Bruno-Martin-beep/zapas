import React, { useState } from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentShoe,
  editShoe,
  changePrevMesh,
} from "../../features/modelsListSlice";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Modal from "../Modal";

const ColorPickerPanel = () => {
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setShowPicker(false);
    }, 350);
  };

  const handlePicker = () => {
    if (!showPicker) {
      setClosing(false);
      setTimeout(() => {
        setShowPicker(true);
      });
    }
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

  const handleColor = (color) => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    dispatch(
      editShoe({
        index: currentModel.currentMesh.index,
        color: color,
      })
    );
  };

  return (
    <div className="custom-color">
      <div className="color-selector">
        <div
          className="color-selected"
          style={{ backgroundColor: currentModel.currentMesh.color }}
          onClick={() => handlePicker()}
        />
        {showPicker && (
          <Modal
            className={classNames("color-picker", { closing: closing })}
            close={close}
          >
            <HexColorPicker
              color={currentModel.currentMesh.color}
              onChange={handleColor}
            />
          </Modal>
        )}
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
