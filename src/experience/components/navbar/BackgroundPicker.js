import React, { useEffect } from "react";
import classNames from "classnames";
import "./backgroundPicker.scss";
import Modal from "../Modal";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useClosing } from "../../hooks/useClosing";
import ColorsControls from "../ColorsControls";
import ColorsSaved from "../ColorsSaved";

const BackgroundPicker = ({
  setOpen,
  setShowPicker,
  background,
  setBackground,
}) => {
  const [showPicker, closing, close] = useClosing(setOpen);

  useEffect(() => {
    setShowPicker(showPicker);
  }, [showPicker, setShowPicker]);

  if (!showPicker) return <></>;
  return (
    <Modal
      className={classNames("background-picker", { closing: closing })}
      close={close}
    >
      <HexColorPicker color={background} onChange={setBackground} />
      <div className="background-controls">
        <HexColorInput
          color={background}
          className={"hexColorInput-bg"}
          onChange={setBackground}
          prefixed
        />
        <ColorsControls className="colors-controls-back" color={background} />
      </div>
      <ColorsSaved
        classParent={"colors-back"}
        classChild={"color-saved-back"}
        action={setBackground}
      />
    </Modal>
  );
};

export default BackgroundPicker;
