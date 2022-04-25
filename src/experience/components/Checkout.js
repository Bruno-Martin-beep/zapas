import React from "react";
import { useClosing } from "../hooks/useClosing";
import classNames from "classnames";
import "./checkout.scss";
import Modal from "./Modal";

const Checkout = ({setOpen}) => {
  const [showCheckout, closing, close] = useClosing(setOpen);

  if (!showCheckout) return <></>;
  return (
     <Modal
      className={classNames("checkout-cont", { closing: closing })}
      close={close}
    >
    </Modal> 
  );
};

export default Checkout;
