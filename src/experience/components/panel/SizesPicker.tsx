import "./sizesPicker.scss"
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { editSize, selectCurrentShoe } from "../../features/modelsListSlice";

const sizes = [39, 40, 41, 42, 43, 44, 45, 46];

const SizesPicker = () => {
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const handleSize = (number: number) => {
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
              className={classNames("numbers",{
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
