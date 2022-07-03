import { useDispatch, useSelector } from "react-redux";
import "./dialogRemoveShoe.scss";
import {
  desableDialogRemoveShoe,
  selectRemoveShoeInfo,
  selectRemoveShoeIsVisible,
} from "../features/removeShoeSlice";
import { CSSTransition } from "react-transition-group";
import { useEffect, useRef } from "react";
import { addShoe, selectShoeList } from "../features/shoeListSlice";
import { selectCurrentShoe, updateShoe } from "../features/modelsListSlice";

interface Prop {
  handleShoe: Function;
}

const DialogRemoveShoe = ({ handleShoe }: Prop) => {
  const isVisible = useSelector(selectRemoveShoeIsVisible);
  const { mousePosition, shoeID } = useSelector(selectRemoveShoeInfo);
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialog.current) {
      const margin = Number(
        getComputedStyle(dialog.current).margin.replace(/px$/, "")
      );

      const isOverflowX =
        mousePosition[0] + dialog.current.offsetWidth + margin * 2 >=
        window.innerWidth;

      const isOverflowY =
        mousePosition[1] + dialog.current.offsetHeight + margin * 2 >=
        window.innerHeight;

      if (isOverflowX) {
        dialog.current.style.left = `${
          window.innerWidth - dialog.current.offsetWidth - margin * 2
        }px`;
      } else {
        dialog.current.style.left = `${mousePosition[0]}px`;
      }

      if (isOverflowY) {
        dialog.current.style.top = `${
          mousePosition[1] - dialog.current.offsetHeight - margin * 2
        }px`;
      } else {
        dialog.current.style.top = `${mousePosition[1]}px`;
      }
    }
  }, [mousePosition]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dialog.current &&
        !dialog.current.contains(event.target as HTMLElement)
      ) {
        dispatch(desableDialogRemoveShoe());
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dialog, dispatch]);

  const handleConfirm = () => {
    const shoe = bag.find((shoe) => shoe.index === shoeID);

    if (shoe) {
      setTimeout(() => {
        handleShoe();
        dispatch(
          addShoe({
            ...shoe,
            currentMesh: currentModel.currentMesh.index,
            editing: !shoe.editing,
          })
        );
        dispatch(
          updateShoe({
            ...shoe,
            currentMesh: currentModel.currentMesh.index,
            editing: !shoe.editing,
          })
        );
      });
    }
    dispatch(desableDialogRemoveShoe());
  };

  const handleDiscard = () => {
    setTimeout(() => {
      const currentShoe = bag.find((shoe) => shoe.index === currentModel.index);
      if (currentShoe) {
        dispatch(
          addShoe({
            ...currentShoe,
            editing: false,
            currentMesh: currentModel.currentMesh.index,
            prevMesh: currentModel.currentMesh,
          })
        );
      }
      const shoe = bag.find((shoe) => shoe.index === shoeID);
      if (shoe) {
        dispatch(
          updateShoe({
            ...shoe,
            editing: !shoe.editing,
            currentMesh: currentModel.currentMesh.index,
            prevMesh: currentModel.currentMesh,
          })
        );
        dispatch(
          addShoe({
            ...shoe,
            editing: !shoe.editing,
            currentMesh: currentModel.currentMesh.index,
            prevMesh: currentModel.currentMesh,
          })
        );
      }
    });
    dispatch(desableDialogRemoveShoe());
  };

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      className="Dialog dialog-removeshoe"
      unmountOnExit={true}
      enter={true}
    >
      <div ref={dialog}>
        <p className="Dialog">Save current shoe?</p>
        <div className="Dialog question-controls">
          <p className="Dialog" onClick={() => handleConfirm()}>Save</p>
          <p className="Dialog" onClick={() => handleDiscard()}>Discard</p>
        </div>
      </div>
    </CSSTransition>
  );
};

export default DialogRemoveShoe;
