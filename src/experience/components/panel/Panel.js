import React from "react";
import "./panel.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { editShoe, changePrevMesh } from "../../features/modelsListSlice";
import MeshSelector from "./MeshSelector";
import ColorPickerPanel from "./ColorPickerPanel";
import SizesPicker from "./SizesPicker";
import ColorsSaved from "../ColorsSaved";

const Panel = ({ currentModel }) => {
  const dispatch = useDispatch();

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
      <ColorsSaved
        classParent={"selectors"}
        classChild={"select-color"}
        action={handleColor}
      />
      <SizesPicker currentModel={currentModel} />
    </div>
  );
};

export default Panel;
