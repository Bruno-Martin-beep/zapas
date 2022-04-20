import React, { useEffect, useRef } from 'react'

const Modal = ({close, children, ...restProps}) => {
  const modal = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (modal.current && !modal.current.contains(event.target)) {
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
  )
}

export default Modal