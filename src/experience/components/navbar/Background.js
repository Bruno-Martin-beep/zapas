import React, { useState, useEffect } from "react";
import classNames from "classnames";
import BackgroundPicker from "./BackgroundPicker";

const Background = () => {
  const [background, setBackground] = useState("#a7c7e7");

  useEffect(() => {
    document.body.style.backgroundColor = background;
  }, [background]);

  const [open, setOpen ] = useState(() => {});

  const [showPicker, setShowPicker] = useState(false);

  const handlePicker = () => {
    open();
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
      <BackgroundPicker setOpen={setOpen} setShowPicker={setShowPicker} background={background} setBackground={setBackground} />
    </div>
  );
};

export default Background;
