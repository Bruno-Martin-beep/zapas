import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  selectDialogIsVisible,
  selectDialogJsx,
} from "../features/dialogSlice";

const Dialog = () => {
  const isVisible = useSelector(selectDialogIsVisible);
  const jsx = useSelector(selectDialogJsx);

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      className="dialog"
      unmountOnExit={true}
      enter={true}
    >
      <div>{jsx}</div>
    </CSSTransition>
  );
};

export default Dialog;
