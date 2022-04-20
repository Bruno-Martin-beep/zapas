import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Modal from "./Modal";
import { HexColorPicker, HexColorInput } from "react-colorful";

const BackgroundPicker = () => {
  const [background, setBackground] = useState("#a7c7e7");
  
  useEffect(() => {
    document.body.style.backgroundColor = background;
  }, [background]);

  const [showPicker, setShowPicker] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setShowPicker(false);
    }, 350);
  };

  const handlePicker = () => {
    if (!showPicker) {
      setTimeout(() => {
        setShowPicker(true);
      });
    }
  };

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

  return (
    <div className="background">
      <div className="background-button" onClick={() => handlePicker()}>
        <div
          className="background-selected"
          style={{ backgroundColor: background }}
        />
        <div className={classNames("background-arrow", { active: showPicker })}>
          {">"}
        </div>
      </div>
      {showPicker && (
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
      )}
    </div>
  );
};

export default BackgroundPicker;
