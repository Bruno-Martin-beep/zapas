import React, { useEffect } from "react";
import "./backgroundPicker.scss";
import { CSSTransition } from "react-transition-group";
import Modal from "../Modal";
import { HexColorPicker, HexColorInput } from "react-colorful";
import ColorsControls from "../ColorsControls";
import ColorsSaved from "../ColorsSaved";
import { useModal } from "../../hooks/useModal";

const BackgroundPicker = ({
  setOpen,
  setShowPicker,
  background,
  setBackground,
}) => {
  const [showPicker, close] = useModal(setOpen);

  useEffect(() => {
    setShowPicker(showPicker);
  }, [showPicker, setShowPicker]);

  return (
    <CSSTransition
      in={showPicker}
      timeout={300}
      className="background-picker"
      unmountOnExit={true}
      enter={true}
    >
      <Modal close={close}>
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
        <div className="colors-saved-back">
          <ColorsSaved
            classParent={"colors-back"}
            classChild={"color-saved-back"}
            action={setBackground}
          />
        </div>
      </Modal>
    </CSSTransition>
  );
};

export default BackgroundPicker;
