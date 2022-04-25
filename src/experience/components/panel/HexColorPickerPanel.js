import React from "react";
import classNames from "classnames";
import { HexColorPicker } from "react-colorful";
import Modal from "../Modal";
import { useClosing } from "../../hooks/useClosing";

const HexColorPickerPanel = ({ setOpen, currentModel, handleColor }) => {
  const [showPicker, closing, close] = useClosing(setOpen);

  if (!showPicker) return <></>;
  return (
    <Modal
      className={classNames("color-picker", { closing: closing })}
      close={close}
    >
      <HexColorPicker
        color={currentModel.currentMesh.color}
        onChange={handleColor}
      />
    </Modal>
  );
};

export default HexColorPickerPanel;
