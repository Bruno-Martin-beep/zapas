import React, { useState } from "react";
import classNames from "classnames";
import Modal from "./Modal";

const Checkout = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setShowCheckout(false);
    }, 350);
  };

  return (
    showCheckout && (
      <Modal classNames={classNames({ closing: closing })} close={close}>
        <div>Checkout</div>
      </Modal>
    )
  );
};

export default Checkout;
