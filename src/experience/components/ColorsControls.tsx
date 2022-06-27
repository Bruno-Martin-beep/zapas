import { useDispatch } from "react-redux";
import { addColor } from "../features/colorsListSlice";
import copyToClipboard from "../utils/copyToClipboard";


const ColorsControls = ({ color, ...restProps }: {color: string, [x: string]: any}) => {
  const dispatch = useDispatch();  

  const handleAdd = (color: string) => {
    dispatch(addColor(color));
  };

  return (
    <>
      <p {...restProps} onClick={() => copyToClipboard(color)}>
        Copy
      </p>
      <p {...restProps} onClick={() => handleAdd(color)}>
        Add
      </p>
    </>
  );
};

export default ColorsControls;
