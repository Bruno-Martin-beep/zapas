import { CSSTransition } from "react-transition-group";
import Modal from "../Modal";
import { HexColorPicker } from "react-colorful";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { selectCurrentShoe } from "../../features/modelsListSlice";

const HexColorPickerPanel = ({ setOpen, handleColor }: { setOpen: Function, handleColor: Function }) => {
  const currentModel = useSelector(selectCurrentShoe);
  const [showPicker, close] = useModal(setOpen);

  return (
    <CSSTransition
      in={showPicker}
      timeout={300}
      className="color-picker"
      unmountOnExit={true}
      enter={true}
    >
      <Modal close={close}>
        <HexColorPicker
          color={currentModel?.currentMesh.color}
          onChange={(color) => handleColor(color)}
        />
      </Modal>
    </CSSTransition>
  );
};

export default HexColorPickerPanel;
