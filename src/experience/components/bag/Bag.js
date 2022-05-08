import React from "react";
import "./bag.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectShoeList } from "../../features/shoeListSlice";
import Modal from "../Modal";
import BagShoe from "./BagShoe";
import SubTotal from "./SubTotal";
import { useClosing } from "../../hooks/useClosing";

const Bag = ({ setOpenBag, handleShoe, openCheckout }) => {
  const bag = useSelector(selectShoeList);

  const [showBag, closing, close] = useClosing(setOpenBag);

  if (!showBag) return <></>;
  return (
    <Modal className={classNames("bag", { closing: closing })} close={close}>
      <div className="bag-title">
        <h3>Your bag</h3>
        <h3 className="close" onClick={() => close()}>
          Close
        </h3>
      </div>
      <div className="bag-content">
        {bag.length === 0 && (
          <p className="bag-text">Your bag is currently empty.</p>
        )}
        {bag.map((shoe) => {
          return (
            <BagShoe
              key={shoe.index}
              shoe={shoe}
              close={close}
              handleShoe={handleShoe}
            />
          );
        })}
      </div>
      <SubTotal bag={bag} />
      <div className="checkout" onClick={openCheckout}>
        Checkout
      </div>
    </Modal>
  );
};

export default Bag;
