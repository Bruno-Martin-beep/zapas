import "./panel.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  editShoe,
  changePrevMesh,
  selectCurrentShoe,
} from "../../features/modelsListSlice";
import MeshSelector from "./MeshSelector";
import ColorPickerPanel from "./ColorPickerPanel";
import ColorsSaved from "../ColorsSaved";
import AddToBag from "./AddToBag";
import ColorsInfo from "./ColorsInfo";
import { CSSTransition } from "react-transition-group";

const Panel = ({ handleDone }: { handleDone: Function }) => {
  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

  const handleColor = (color: string) => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    dispatch(
      editShoe({
        index: currentModel.currentMesh.index,
        color: color,
      })
    );
  };

  return (
    <CSSTransition
      in={currentModel?.editing}
      timeout={300}
      unmountOnExit={true}
      enter={true}
    >
      <div className="panel">
        <MeshSelector />
        <ColorPickerPanel handleColor={handleColor} />
        <div className="colors-saved-panel">
          <ColorsInfo />
          <ColorsSaved
            classParent={"selectors"}
            classChild={"select-color"}
            action={handleColor}
          />
        </div>
        <AddToBag handleDone={handleDone} />
      </div>
    </CSSTransition>
  );
};

export default Panel;
