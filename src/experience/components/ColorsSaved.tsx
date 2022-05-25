import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectcolorsList, removeColor } from "../features/colorsListSlice";

const ColorsSaved = ({ classParent, classChild, action }: { classParent: string, classChild: string, action: Function }) => {
  const colorsList = useSelector(selectcolorsList);
  const dispatch = useDispatch();

  const handleRemove = (e: MouseEvent, color: string) => {
    e.preventDefault();
    dispatch(removeColor(color));
  };

  return (
    <div className={classParent}>
      {colorsList.map((color: string, index: number) => {
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
