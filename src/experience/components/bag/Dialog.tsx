import { useState } from "react";
import "./dialog.scss";
import { useSelector } from "react-redux";
import { selectCurrentShoe } from "../../features/modelsListSlice";
import { selectShoeList } from "../../features/shoeListSlice";
import { CSSTransition } from "react-transition-group";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";

const Dialog = ({
  name,
  actionDefault,
  actionConfirm,
}: {
  name: string;
  actionDefault: Function;
  actionConfirm: Function;
}) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);

  const [title, setTitle] = useState("Save current shoe?");
  const [confirm, setConfirm] = useState("Save");

  const [open, setOpen] = useState<Function>(() => {});

  const [showQuestion, close] = useModal(setOpen);

  const handleConfirm = () => {
    actionConfirm();
    close();
  };

  const handleDiscard = () => {
    actionDefault();
    close();
  };

  //TODO: Refactor in to a single dialog

  const checkShoe = () => {
    const shoe = bag.find((shoe) => shoe.index === currentModel.index);
    if (shoe) {
      const isSameShoe = shoe.meshes.every(
        (mesh) => mesh.color === currentModel.meshes[mesh.index].color
      );

      if (isSameShoe) {
        actionDefault();
        return;
      }

      setTitle("Save current shoe?");
      setConfirm("Save");
      open();
      return;
    }

    const isDefault = currentModel.meshes.every(
      (mesh) => mesh.color === "#ffffff"
    );
    const isAlreadySaved = bag.some((shoe) =>
      shoe.meshes.every(
        (mesh) => mesh.color === currentModel.meshes[mesh.index].color
      )
    );

    if (isDefault || isAlreadySaved) {
      actionDefault();
      return;
    }
    setTitle("Add to bag current shoe?");
    setConfirm("Add to bag");
    open();
  };

  return (
    <div className="bag-shoe-control">
      <p className="bag-shoe-control" onClick={() => checkShoe()}>
        {name}
      </p>
      <CSSTransition
        in={showQuestion}
        timeout={300}
        className="question"
        unmountOnExit={true}
        enter={true}
      >
        <Modal close={close}>
          <p>{title}</p>
          <div className="question-controls">
            <p onClick={() => handleConfirm()}>{confirm}</p>
            <p onClick={() => handleDiscard()}>Discard</p>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default Dialog;
