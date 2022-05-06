import React from "react";
import classNames from "classnames";
import { useClosing } from "../hooks/useClosing";
import "./checkout.scss";
import Modal from "./Modal";

const Checkout = ({ setOpen }) => {
  const [showCheckout, closing, close] = useClosing(setOpen);

  if (!showCheckout) return <></>;
  return (
    <Modal
      className={classNames("checkout-cont", { closing: closing })}
      close={close}
    >
      <h2 className="checkout-text-1">Hey, this is a proyect for prove my skills 👨‍💻</h2>
      <h2 className="checkout-text-2">For more info about me, here is <a target="_blank" rel="noreferrer" href="https://bruno-martin-beep.github.io/portfolio/">my portfolio</a></h2>
      
    </Modal>
  );
};

export default Checkout;
