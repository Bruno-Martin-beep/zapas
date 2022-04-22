import React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { editSize } from "../../features/modelsListSlice";

const sizes = [39, 40, 41, 42, 43, 44, 45, 46];

const SizesPicker = ({ currentModel }) => {
  const dispatch = useDispatch();

  const handleSize = (number) => {
    dispatch(editSize(number));
  };

  return (
    <div className="sizes">
      <h2>sizes</h2>
      <div className="sizes-numbers">
        {sizes.map((elem, index) => {
          return (
            <h2
              key={index}
              onClick={() => handleSize(elem)}
              className={classNames({
                numberSelected: elem === currentModel.size,
              })}
            >
              {elem}
            </h2>
          );
        })}
      </div>
    </div>
  );
};

export default SizesPicker;
