import { useState } from "react";
import "./dialog.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentShoe } from "../../features/modelsListSlice";
import { selectShoeList } from "../../features/shoeListSlice";
import { CSSTransition } from "react-transition-group";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";
import { activeDialog, changeDialog, desableDialog } from "../../features/dialogSlice";

const Dialog = ({
  actionDefault,
  actionConfirm,
}: {
  actionDefault: Function;
  actionConfirm: Function;
}) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);

  const [open, setOpen] = useState<Function>(() => {});

  const [showQuestion, close] = useModal(setOpen);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    actionConfirm();
    dispatch(desableDialog());
    close();
  };

  const handleDiscard = () => {
    actionDefault();
    dispatch(desableDialog());
    close();
  };

  const checkShoe = () => {
    const currentShoe = bag.find((shoe) => shoe.index === currentModel.index);

    const hasNoChanges = currentShoe?.meshes.every(
      (mesh) => mesh.color === currentModel.meshes[mesh.index].color
    );

    const isDefault = currentModel.meshes.every(
      (mesh) => mesh.color === "#ffffff"
    );

    if ((currentShoe && hasNoChanges) || (!currentShoe && isDefault)) {
      actionDefault();
      return;
    }
    dispatch(activeDialog());
    dispatch(changeDialog(<p>test</p>));

    open();
  };

  return (
    <div className="bag-shoe-control">
      <p className="bag-shoe-control" onClick={() => checkShoe()}>
        Edit
      </p>
      <CSSTransition
        in={showQuestion}
        timeout={300}
        className="question"
        unmountOnExit={true}
        enter={true}
      >
        <Modal close={close}>
          <p>Save current shoe?</p>
          <div className="question-controls">
            <p onClick={() => handleConfirm()}>Save</p>
            <p onClick={() => handleDiscard()}>Discard</p>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default Dialog;
