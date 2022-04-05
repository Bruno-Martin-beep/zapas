import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { selectShoeList, toggleEditing } from "../features/modelsListSlice";
import { HexColorPicker, HexColorInput } from "react-colorful";
import Bag from "./Bag";

const Navbar = ({ baseModel, currentModel }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);

  const [active, setActive] = useState(false);
  const [background, setBackground] = useState("#a7c7e7");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = background;
  }, [background]);

  const picker = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (picker.current && !picker.current.contains(event.target)) {
        setShowPicker(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [picker]);

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

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  const HandleBack = () => {
    dispatch(toggleEditing());
  };

  return (
    <>
      <h2
        className={classNames("navbar logo", {
          visible: !currentModel.editing,
        })}
      >
        zapaz
      </h2>
      <h2 className="navbar beta">beta</h2>
      <h2
        className={classNames("navbar logo", { visible: currentModel.editing })}
        onClick={() => HandleBack()}
      >
        {"<"}
      </h2>
      <div className="background" ref={picker}>
        <div
          className="background-button"
          onClick={() => setShowPicker((prev) => !prev)}
        >
          <div
            className="background-selected"
            style={{ backgroundColor: background }}
          />
          <div
            className={classNames("background-arrow", { active: showPicker })}
          >
            {">"}
          </div>
        </div>

        <div
          className={classNames("background-picker", { visible: showPicker })}
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
        </div>
      </div>
      <h2 className="navbar bag-info" onClick={() => handleClick()}>
        bag {bag.length}
      </h2>
      <Bag active={active} baseModel={baseModel} handleClick={handleClick} />
    </>
  );
};

export default Navbar;
