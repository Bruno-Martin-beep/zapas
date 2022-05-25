import { useDispatch } from "react-redux";
import { addColor } from "../features/colorsListSlice";

const ColorsControls = ({ color, ...restProps }: {color: string, [x: string]: any}) => {
  const dispatch = useDispatch();

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const handleAdd = (color: string) => {
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
