import React, { useState } from "react";
import "./background.scss";
import classNames from "classnames";
import BackgroundPicker from "./BackgroundPicker";

const Background = ({ background, setBackground, ...restProps }) => {
  const [showPicker, setShowPicker] = useState(null);
  const [open, setOpen] = useState(() => {});

  const handlePicker = () => {
    if(!showPicker) {
      open();
    }
  };

  return (
    <div {...restProps} >
      <div className="background-button" onClick={handlePicker}>
        <div
          className="background-selected"
          style={{ backgroundColor: background }}
        />
        <svg
          className={classNames(
            "background-arrow",
            { active: showPicker },
            { disable: showPicker === false }
          )}
          name="expand more"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path d="M14.15 16.6 24 26.5 33.85 16.65 36 18.8 24 30.75 12 18.75Z" />
        </svg>
      </div>
      <BackgroundPicker
        setOpen={setOpen}
        setShowPicker={setShowPicker}
        background={background}
        setBackground={setBackground}
      />
    </div>
  );
};

export default Background;
