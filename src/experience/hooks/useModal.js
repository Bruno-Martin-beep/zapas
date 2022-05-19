import { useEffect, useState } from "react";

export const useModal = (handleOpen) => {
  const [show, setShow] = useState(null);

  const close = () => {
    setShow(false);
  };

  useEffect(() => {
    handleOpen(
      () => () =>
        setTimeout(() => {
          setShow(true);
        })
    );
  }, [handleOpen]);

  return [show, close];
};
