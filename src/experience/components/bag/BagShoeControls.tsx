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
import { nanoid } from "nanoid";

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
            editing: false,
            currentMesh: currentModel.currentMesh.index,
            prevMesh: currentModel.currentMesh,
          })
        );
      }
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
    });
  };

  const handleEditConfirm = () => {
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
  };

  const handleCopy = () => {
    dispatch(
      updateShoe({
        ...currentModel,
        meshes: shoe.meshes,
        currentMesh: currentModel.currentMesh.index,
        prevMesh: currentModel.currentMesh,
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
        editing: false,
        currentMesh: currentModel.currentMesh.index,
        index: nanoid(),
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
