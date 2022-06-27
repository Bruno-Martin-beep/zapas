import "./contextMenu.scss";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  clearColorList,
  removeColor,
  resetColorList,
} from "../features/colorsListSlice";
import {
  selectDialogIsVisible,
  selectDialogColor,
  desableDialog,
  selectMousePosition,
} from "../features/dialogSlice";
import { useEffect, useRef } from "react";
import copyToClipboard from "../utils/copyToClipboard";

const ContextMenu = () => {
  const isVisible = useSelector(selectDialogIsVisible);
  const mousePosition = useSelector(selectMousePosition);
  const color = useSelector(selectDialogColor);

  const dispatch = useDispatch();

  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialog.current) {
      const margin = Number(
        getComputedStyle(dialog.current).margin.replace(/px$/, "")
      );

      const isOverflowX =
        mousePosition[0] + dialog.current.offsetWidth + margin * 2 >=
        window.innerWidth;

      const isOverflowY =
        mousePosition[1] + dialog.current.offsetHeight + margin * 2 >=
        window.innerHeight;

      if (isOverflowX) {
        dialog.current.style.left = `${
          window.innerWidth - dialog.current.offsetWidth - margin * 2
        }px`;
      } else {
        dialog.current.style.left = `${mousePosition[0]}px`;
      }

      if (isOverflowY) {
        dialog.current.style.top = `${
          mousePosition[1] - dialog.current.offsetHeight - margin * 2
        }px`;
      } else {
        dialog.current.style.top = `${mousePosition[1]}px`;
      }
    }
  }, [mousePosition]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dialog.current &&
        !dialog.current.contains(event.target as HTMLElement)
      ) {
        dispatch(desableDialog());
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dialog, dispatch]);

  const handleCopyColor = () => {
    copyToClipboard(color);
    dispatch(desableDialog());
  };

  const handleRemoveColor = () => {
    dispatch(removeColor(color));
    dispatch(desableDialog());
  };

  const handleResetColor = () => {
    dispatch(resetColorList());
    dispatch(desableDialog());
  };

  const handleDeleteAll = () => {
    dispatch(clearColorList());
    dispatch(desableDialog());
  };

  const preventDefault = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      className="Dialog dialog-contextmenu"
      unmountOnExit={true}
      enter={true}
    >
      <div onContextMenu={(e) => preventDefault(e)} ref={dialog}>
        <CSSTransition
          in={color.length !== 0}
          timeout={300}
          className="Dialog dialog-color"
          unmountOnExit={true}
          enter={true}
        >
          <div>
            <div
              className="Dialog dialog-item"
              onClick={() => handleCopyColor()}
            >
              <p className="Dialog">Copy</p>
              <p className="Dialog dialog-copy-color">{color}</p>
            </div>
            <div
              className="Dialog dialog-item"
              onClick={() => handleRemoveColor()}
            >
              <p className="Dialog">Delete</p>
              <div
                className="Dialog dialog-delete-color"
                style={{ backgroundColor: color }}
              />
            </div>
            <hr className="Dialog dialog-item-hr" />
          </div>
        </CSSTransition>
        <div className="Dialog dialog-item" onClick={() => handleResetColor()}>
          <p className="Dialog">Reset colors</p>
        </div>
        <div className="Dialog dialog-item" onClick={() => handleDeleteAll()}>
          <p className="Dialog">Delete all colors</p>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ContextMenu;
