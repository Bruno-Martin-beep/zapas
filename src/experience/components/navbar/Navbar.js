import React from "react";
import "./navbar.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentShoe, updateShoe } from "../../features/modelsListSlice";
import { selectShoeList } from "../../features/shoeListSlice";
import Background from "./Background";
import ShoeName from "./ShoeName";

const Navbar = ({
  background,
  setBackground,
  openBag,
}) => {
  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);
  const bag = useSelector(selectShoeList);

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
      <h2 className="navbar bag-info" onClick={openBag}>
        bag {bag.length}
      </h2>
      <ShoeName />
    </>
  );
};

export default Navbar;
