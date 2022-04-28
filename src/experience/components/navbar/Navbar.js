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
      <div
        className={classNames("navbar back", {
          visible: currentModel.editing,
        })}
        onClick={HandleBack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M28.05 36 16 23.95 28.05 11.9 30.2 14.05 20.3 23.95 30.2 33.85Z" />
        </svg>
        back
      </div>
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
