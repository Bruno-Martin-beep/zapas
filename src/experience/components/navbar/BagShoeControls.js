import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShoeList,
  selectCurrentShoe,
  addShoe,
  addToList,
  removeShoe,
} from "../../features/modelsListSlice";
import Dialog from "./Dialog";

const BagShoeControls = ({ shoe, handleDone }) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const handleEdit = () => {
    const currentShoe = bag.find((elem) => elem.index === currentModel.index);
    if (currentShoe) {
      dispatch(addToList({ ...currentShoe, editing: false }));
    }
    dispatch(addShoe({ ...shoe, editing: !shoe.editing}));
    dispatch(addToList({ ...shoe, editing: !shoe.editing}));
  };

  const handleEditConfirm = () => {
    handleDone();
    dispatch(addShoe({ ...shoe, editing: !shoe.editing}));
    dispatch(addToList({ ...shoe, editing: !shoe.editing}));
  };

  const handleCopy = () => {
    dispatch(addShoe({ ...currentModel, meshes: shoe.meshes }));
  };

  const handleSave = () => {
    handleDone();
  };

  const handleDiscard = () => {
    dispatch(addShoe({ ...shoe, editing: false}));
    dispatch(addToList({ ...shoe, editing: false}));
  };

  const handleRemove = () => {
    setTimeout(() => {
      dispatch(removeShoe(shoe));
    });
  };

  return (
    <div className="bag-shoe-info2">
      <div className="bag-shoe-control">
        {shoe.editing ? (
          <>
            <p className="bag-shoe-control" onClick={() => handleSave()}>
              Save
            </p>
            <p className="bag-shoe-control" onClick={() => handleDiscard()}>
              Discard
            </p>
          </>
        ) : (
          <>
            <Dialog
              className="bag-shoe-control"
              name={"Edit"}
              actionDefault={() => handleEdit()}
              actionConfirm={() => handleEditConfirm()}
            />
            <p className="bag-shoe-control" onClick={() => handleCopy()}>
              Copy
            </p>
          </>
        )}
      </div>
      <p className="bag-shoe-control" onClick={() => handleRemove()}>
        Remove
      </p>
    </div>
  );
};

export default BagShoeControls;
