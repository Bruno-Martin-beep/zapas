import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectcolorsList, removeColor } from "../features/colorsListSlice";
import { saveToLocalStorage } from "../localStorage";

const ColorsSaved = ({ classParent, classChild, action }) => {
  const colorsList = useSelector(selectcolorsList);
  const dispatch = useDispatch();

  useEffect(() => {
    saveToLocalStorage("colors", colorsList);
  }, [colorsList]);

  const handleRemove = (e, color) => {
    e.preventDefault();
    dispatch(removeColor(color));
  };

  return (
    <div className={classParent}>
      {colorsList.map((color, index) => {
        return (
          <div
            key={index}
            onClick={() => action(color)}
            onContextMenu={(e) => handleRemove(e, color)}
            style={{ backgroundColor: color }}
            className={classChild}
          />
        );
      })}
    </div>
  );
};

export default ColorsSaved;
