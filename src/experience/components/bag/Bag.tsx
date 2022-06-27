import "./bag.scss";
import { useSelector } from "react-redux";
import { selectShoeList } from "../../features/shoeListSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Modal from "../Modal";
import BagShoe from "./BagShoe";
import SubTotal from "./SubTotal";
import { useModal } from "../../hooks/useModal";

const Bag = ({
  setOpenBag,
  handleShoe,
  openCheckout,
}: {
  setOpenBag: Function;
  handleShoe: Function;
  openCheckout: Function;
}) => {
  const bag = useSelector(selectShoeList);
  const [showBag, close] = useModal(setOpenBag);

  const handleAppearing = (
    node: HTMLElement,
    isAppearing: boolean,
    index: number
  ) => {
    if (isAppearing) {
      node.style.transitionDelay = `${(index + 2) * 100}ms`;
    }
  };

  const handleAppeared = (node: HTMLElement, isAppearing: boolean) => {
    if (isAppearing) {
      node.style.transitionDelay = "";
    }
  };

  return (
    <CSSTransition
      in={showBag}
      timeout={300}
      className="bag"
      unmountOnExit={true}
      enter={true}
    >
      <Modal close={close}>
        <div className="bag-title">
          <h3>Your bag</h3>
          <h3 className="close" onClick={() => close()}>
            Close
          </h3>
        </div>
        <CSSTransition
          in={bag.length === 0}
          timeout={800}
          unmountOnExit={true}
          exit={false}
        >
          <p className="bag-text">Your bag is currently empty.</p>
        </CSSTransition>
        <TransitionGroup className="bag-content">
          {bag.map((shoe, index: number) => {
            return (
              <CSSTransition
                key={shoe.index}
                timeout={{
                  appear: 300 + (bag.length + 2) * 100,
                  enter: 300,
                  exit: 600,
                }}
                onEnter={(node, isAppearing) =>
                  handleAppearing(node, isAppearing, index)
                }
                onEntered={(node, isAppearing) =>
                  handleAppeared(node, isAppearing)
                }
                className="bag-shoe"
                appear={true}
                enter={true}
                exit={true}
              >
                <BagShoe shoe={shoe} handleShoe={handleShoe} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <SubTotal />
        <div className="checkout" onClick={() => openCheckout()}>
          Checkout
        </div>
      </Modal>
    </CSSTransition>
  );
};

export default Bag;
