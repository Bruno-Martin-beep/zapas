import React, { useEffect } from "react";
import classNames from "classnames";
import Modal from "../Modal";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useClosing } from "../../hooks/useClosing";

const BackgroundPicker = ({ setOpen, setShowPicker, background, setBackground }) => {
  const [showPicker, closing, close] = useClosing(setOpen);

  useEffect(() => {
    setShowPicker(showPicker)
  }, [showPicker, setShowPicker])
  
  const handleCopy = () => {
    navigator.clipboard.writeText(background);
  };

  const handlePaste = () => {
    const regex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    navigator.clipboard.readText().then((clipText) => {
      if (regex.test(clipText)) {
        setBackground(clipText);
      }
    });
  };

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
          style={{ width: "75px" }}
          onChange={setBackground}
          prefixed
        />
        <p className="custom-color-copy" onClick={() => handleCopy()}>
          Copy
        </p>
        <p className="custom-color-copy" onClick={() => handlePaste()}>
          Paste
        </p>
      </div>
    </Modal>
  );
};

export default BackgroundPicker;
