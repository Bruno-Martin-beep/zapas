import React from "react";
import { useDispatch } from "react-redux";
import { addColor } from "../features/colorsListSlice";

const ColorsControls = ({ color, ...restProps }) => {
  const dispatch = useDispatch();

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
  };

  const handleAdd = (color) => {
    dispatch(addColor(color));
  };

  return (
    <>
      <p {...restProps} onClick={() => handleCopy(color)}>
        Copy
      </p>
      <p {...restProps} onClick={() => handleAdd(color)}>
        Add
      </p>
    </>
  );
};

export default ColorsControls;
