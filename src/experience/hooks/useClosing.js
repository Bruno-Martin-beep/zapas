import { useEffect, useState } from "react";

export const useClosing = (handleOpen) => {
  const [show, setShow] = useState(null);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setShow(false);
    }, 350);
  };

  useEffect(() => {
    handleOpen(
      () => () =>
        setTimeout(() => {
          setShow(true);
        })
    );
  }, [handleOpen]);

  return [show, closing, close];
};
