import React, { useState } from "react";
import "./navbar.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { updateShoe } from "../../features/modelsListSlice";
import { selectShoeList } from "../../features/shoeListSlice";
import Bag from "./Bag";
import Background from "./Background";

const Navbar = ({ currentModel, handleDone, openCheckout }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);

  const [open, setOpen] = useState(() => {});

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
        onClick={HandleBack}
      >
        {"<"}
      </h2>
      <Background />
      <h2 className="navbar bag-info" onClick={open}>
        bag {bag.length}
      </h2>
      <Bag
        setOpen={setOpen}
        handleDone={handleDone}
        openCheckout={openCheckout}
      />
    </>
  );
};

export default Navbar;
