import React, { useState } from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { updateShoe } from "../../features/modelsListSlice";
import { selectShoeList } from "../../features/shoeListSlice";
import Bag from "./Bag";
import BackgroundPicker from "./BackgroundPicker";

const Navbar = ({ currentModel, handleDone }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);

  const [showBag, setShowBag] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setShowBag(false);
    }, 350);
  };

  const handleBag = () => {
    if (!showBag) {
      setTimeout(() => {
        setShowBag(true);
      });
    }
  };

  const HandleBack = () => {
    dispatch(updateShoe({ ...currentModel, editing: false }));
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
        className={classNames("navbar logo", {
          visible: currentModel.editing,
        })}
        onClick={() => HandleBack()}
      >
        {"<"}
      </h2>
      <BackgroundPicker />
      <h2 className="navbar bag-info" onClick={() => handleBag()}>
        bag {bag.length}
      </h2>
      {showBag && (
        <Bag closing={closing} close={close} handleDone={handleDone} />
      )}
    </>
  );
};

export default Navbar;
