import { useEffect, useState } from "react";

export const useModal = (handleOpen: Function): [boolean, Function] => {
  const [show, setShow] = useState<boolean>(false);

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
