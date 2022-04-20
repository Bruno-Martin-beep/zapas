import React, { useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectShoeList, selectCurrentShoe } from "../../features/modelsListSlice";
import Modal from "../Modal";

const Dialog = ({ name, actionDefault, actionConfirm, ...restProps }) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);

  const [title, setTitle] = useState("Save current shoe?");
  const [confirm, setConfirm] = useState("Save");

  const [showQuestion, setShowQuestion] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setShowQuestion(false);
    }, 350);
  };

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
        return actionDefault();
      }
      setTitle("Save current shoe?");
      setConfirm("Save");
      setTimeout(() => {
        setShowQuestion(true);
      });
      return setTimeout(() => setShowQuestion(true));
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
      return actionDefault();
    }
    setTitle("Add to bag current shoe?");
    setConfirm("Add to bag");
    return setTimeout(() => setShowQuestion(true));
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
          <div className="background-controls">
            <p onClick={() => handleConfirm()}>{confirm}</p>
            <p onClick={() => handleDiscard()}>Discard</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dialog;
