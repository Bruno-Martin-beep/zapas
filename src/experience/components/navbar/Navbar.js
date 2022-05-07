import React, { useState } from "react";
import "./navbar.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { updateShoe } from "../../features/modelsListSlice";
import { selectShoeList } from "../../features/shoeListSlice";
import Bag from "./Bag";
import Background from "./Background";

const Navbar = ({
  currentModel,
  background,
  setBackground,
  handleDone,
  openCheckout,
}) => {
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
          visible: !currentModel?.editing,
        })}
      >
        Zapa<span className="flip-horizontally">Z</span>
      </h2>
      <h2 className="navbar beta">beta</h2>
      <div
        className={classNames("navbar back", {
          visible: currentModel?.editing,
        })}
        onClick={HandleBack}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path d="M28.05 36 16 23.95 28.05 11.9 30.2 14.05 20.3 23.95 30.2 33.85Z" />
        </svg>
        <h2>back</h2>
      </div>
      <Background
        className="navbar background"
        background={background}
        setBackground={setBackground}
      />
      <h2 className="navbar bag-info" onClick={open}>
        bag {bag.length}
      </h2>
      <Bag
        setOpen={setOpen}
        handleDone={handleDone}
        openCheckout={openCheckout}
      />
      <div
        className={classNames("shoe-name", {
          visible: !currentModel?.editing,
        })}
      >
        <p className="shoe-click">Click shoe to edit</p>
        <h2>{currentModel?.name}</h2>
      </div>
    </>
  );
};

export default Navbar;
