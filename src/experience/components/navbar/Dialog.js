import React, { useState } from "react";
import "./dialog.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectCurrentShoe } from "../../features/modelsListSlice";
import { selectShoeList } from "../../features/shoeListSlice";
import Modal from "../Modal";
import { useClosing } from "../../hooks/useClosing";

const Dialog = ({ name, actionDefault, actionConfirm, ...restProps }) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);

  const [title, setTitle] = useState("Save current shoe?");
  const [confirm, setConfirm] = useState("Save");

  const [open, setOpen ] = useState(() => {});

  const [showQuestion, closing, close] = useClosing(setOpen);

  const handleConfirm = () => {
    actionConfirm();
    close();
  };

  const handleDiscard = () => {
    actionDefault();
    close();
  };

  const checkShoe = () => {
    const isOnBag = bag.some((shoe) => shoe.index === currentModel.index);
    if (isOnBag) {
      const isSameShoe = bag
        .find((elem) => elem.index === currentModel.index)
        .meshes.every(
          (mesh) => mesh.color === currentModel.meshes[mesh.index].color
        );

      if (isSameShoe) {
        actionDefault();
        return 
      }
      setTitle("Save current shoe?");
      setConfirm("Save");
      open();
      return 
    }

    const isDefault = currentModel.meshes.every(
      (mesh) => mesh.color === "#ffffff"
    );
    const isAlreadySaved = bag.some((elem) =>
      elem.meshes.every(
        (mesh) => mesh.color === currentModel.meshes[mesh.index].color
      )
    );

    if (isDefault || isAlreadySaved) {
      actionDefault();
      return 
    }
    setTitle("Add to bag current shoe?");
    setConfirm("Add to bag");
    open();
  };

  return (
    <div {...restProps}>
      <p className="bag-shoe-control" onClick={() => checkShoe()}>
        {name}
      </p>
      {showQuestion && (
        <Modal
          className={classNames("question", {
            closing: closing,
          })}
          close={close}
        >
          <p>{title}</p>
          <div className="question-controls">
            <p onClick={() => handleConfirm()}>{confirm}</p>
            <p onClick={() => handleDiscard()}>Discard</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dialog;
