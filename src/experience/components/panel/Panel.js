import React from "react";
import "./panel.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { editShoe, changePrevMesh, selectCurrentShoe } from "../../features/modelsListSlice";
import MeshSelector from "./MeshSelector";
import ColorPickerPanel from "./ColorPickerPanel";
import ColorsSaved from "../ColorsSaved";
import AddToBag from "./AddToBag";

const Panel = ({ handleDone }) => {
  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

  const handleColor = (color) => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    dispatch(
      editShoe({
        index: currentModel.currentMesh.index,
        color: color,
      })
    );
  };

  return (
    <div className={classNames("panel", { visible: currentModel.editing })}>
      <MeshSelector currentModel={currentModel} />
      <ColorPickerPanel currentModel={currentModel} handleColor={handleColor} />
      <div className="colors-saved-panel">
        <ColorsSaved
          classParent={"selectors"}
          classChild={"select-color"}
          action={handleColor}
        />
      </div>
      <AddToBag handleDone={handleDone} />
    </div>
  );
};

export default Panel;
