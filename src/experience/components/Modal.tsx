import { useEffect, useRef } from "react";

const Modal = ({ close, children, ...restProps }: { close: Function, children: JSX.Element | JSX.Element[]; }) => {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (modal.current && !modal.current.contains(event.target as HTMLElement)) {
        close();
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [modal, close]);

  return (
    <div {...restProps} ref={modal}>
      {children}
    </div>
  );
};

export default Modal;
