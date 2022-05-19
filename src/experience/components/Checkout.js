import React from "react";
import "./checkout.scss";
import { useModal } from "../hooks/useModal";
import { CSSTransition } from "react-transition-group";
import Modal from "./Modal";

const Checkout = ({ setOpen }) => {
  const [showCheckout, close] = useModal(setOpen);

  return (
    <CSSTransition
      in={showCheckout}
      timeout={300}
      className="checkout-cont"
      unmountOnExit={true}
      enter={true}
    >
      <Modal close={close}>
        <h2 className="checkout-text-1">
          Hey, this is a proyect for prove my skills 👨‍💻
        </h2>
        <h2 className="checkout-text-2">
          For more info about me, here is{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://bruno-martin-beep.github.io/portfolio/"
          >
            my portfolio
          </a>
        </h2>
      </Modal>
    </CSSTransition>
  );
};

export default Checkout;
