import React, { useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { saveToLocalStorage } from "../localStorage";
import { selectShoeList } from "../features/modelsListSlice";
import Modal from "./Modal";
import BagShoeControls from "./BagShoeControls";

const Bag = ({ closing, close, handleDone }) => {
  const bag = useSelector(selectShoeList);

  useEffect(() => {
    saveToLocalStorage(bag);
  }, [bag]);

  return (
    <Modal className={classNames("bag", { closing: closing })} close={close}>
      <div className="bag-title">
        <h3>Your bag</h3>
        <h3 className="close" onClick={() => close()}>
          Close
        </h3>
      </div>
      <div className="bag-content">
        {bag.length === 0 && <p>Your bag is currently empty.</p>}
        {bag.map((shoe) => {
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
        })}
      </div>
      <div className="checkout">Checkout</div>
    </Modal>
  );
};

export default Bag;
