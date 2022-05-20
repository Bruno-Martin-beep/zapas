import React from "react";
import "./bagShoe.scss";
import classNames from "classnames";
import BagShoeControls from "./BagShoeControls";

const BagShoe = ({ shoe, close, handleShoe }) => {
  return (
    <div className={classNames("bag-shoe", { editing: shoe.editing })}>
      <img className="bag-shoe-image" src={shoe.image} alt={"Shoe"} />
      <div className="bag-shoe-info">
        <div className="bag-shoe-info2">
          <p>{shoe.name}</p>
          <p>${shoe.price}</p>
        </div>
        <p>Size {shoe.size}</p>
        <BagShoeControls shoe={shoe} closeBag={close} handleShoe={handleShoe} />
      </div>
    </div>
  );
};

export default BagShoe;
