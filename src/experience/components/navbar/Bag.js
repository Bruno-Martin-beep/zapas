import React, { useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { saveToLocalStorage } from "../../localStorage";
import { selectShoeList } from "../../features/shoeListSlice";
import Modal from "../Modal";
import BagShoe from "./BagShoe";
import SubTotal from "./SubTotal";

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
            <BagShoe shoe={shoe}
            close={close}
            handleDone={handleDone} />
            
          );
        })}
      </div>
      <SubTotal bag={bag} />
      <div className="checkout">Checkout</div>
    </Modal>
  );
};

export default Bag;
