import React from "react";
import "./bagShoeControls.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentShoe, updateShoe } from "../../features/modelsListSlice";
import {
  addShoe,
  StandardModel,
  removeShoe,
  selectShoeList,
} from "../../features/shoeListSlice";
import Dialog from "./Dialog";

const BagShoeControls = ({
  shoe,
  handleShoe,
}: {
  shoe: StandardModel;
  handleShoe: Function;
}) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setTimeout(() => {
      const currentShoe = bag.find((shoe) => shoe.index === currentModel.index);
      if (currentShoe) {
        dispatch(
          addShoe({
            ...currentShoe,
            currentMesh: currentModel.currentMesh.index,
            editing: false,
          })
        );
      }
      dispatch(
        updateShoe({
          ...shoe,
          currentMesh: currentModel.currentMesh.index,
          editing: !shoe.editing,
        })
      );
      dispatch(
        addShoe({
          ...shoe,
          currentMesh: currentModel.currentMesh.index,
          editing: !shoe.editing,
        })
      );
    });
  };

  const handleEditConfirm = () => {
    setTimeout(() => {
      handleShoe();
      dispatch(
        updateShoe({
          ...shoe,
          currentMesh: currentModel.currentMesh.index,
          editing: !shoe.editing,
        })
      );
      dispatch(
        addShoe({
          ...shoe,
          currentMesh: currentModel.currentMesh.index,
          editing: !shoe.editing,
        })
      );
    });
  };

  const handleCopy = () => {
    dispatch(
      updateShoe({
        ...currentModel,
        currentMesh: currentModel.currentMesh.index,
        meshes: shoe.meshes,
      })
    );
  };

  const handleSave = () => {
    setTimeout(() => {
      handleShoe();
    });
  };

  const handleDiscard = () => {
    dispatch(
      updateShoe({
        ...shoe,
        currentMesh: currentModel.currentMesh.index,
        editing: false,
      })
    );
    dispatch(
      addShoe({
        ...shoe,
        currentMesh: currentModel.currentMesh.index,
        editing: false,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeShoe(shoe));
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
