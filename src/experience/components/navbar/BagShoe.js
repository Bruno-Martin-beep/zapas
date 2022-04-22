import React from "react";
import classNames from "classnames";
import BagShoeControls from "./BagShoeControls";

const BagShoe = ({ shoe, close, handleDone }) => {
  return (
    <div
      key={shoe.index}
      className={classNames("bag-shoe", { editing: shoe.editing })}
    >
      <img className="bag-shoe-image" src={shoe.image} alt={"Shoe"} />
      <div className="bag-shoe-info">
        <div className="bag-shoe-info2">
          <p>{shoe.name}</p>
          <p>${shoe.price}</p>
        </div>
        <p>Size {shoe.size}</p>
        <BagShoeControls shoe={shoe} closeBag={close} handleDone={handleDone} />
      </div>
    </div>
  );
};

export default BagShoe;
