import React, { useState } from "react";
import "./bagShoe.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { removeShoe } from "../../features/shoeListSlice";
import BagShoeControls from "./BagShoeControls";

const BagShoe = ({ shoe, close, handleDone }) => {
  const [closing, setClosing] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = () => {
    setClosing(true);
    setTimeout(() => {
      dispatch(removeShoe(shoe));
    }, 350);
  };

  return (
    <div
      className={classNames("bag-shoe", { editing: shoe.editing, closing: closing })}
    >
      <img className="bag-shoe-image" src={shoe.image} alt={"Shoe"} />
      <div className="bag-shoe-info">
        <div className="bag-shoe-info2">
          <p>{shoe.name}</p>
          <p>${shoe.price}</p>
        </div>
        <p>Size {shoe.size}</p>
        <BagShoeControls shoe={shoe} closeBag={close} handleDone={handleDone} handleRemove={handleRemove} />
      </div>
    </div>
  );
};

export default BagShoe;
