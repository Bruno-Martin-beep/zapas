import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentShoe } from "../features/modelsListSlice";
import { addShoe, selectShoeList } from "../features/shoeListSlice";
import { addList, selectcolorsList } from "../features/colorsListSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorage";
import Navbar from "./navbar/Navbar";
import Model3d from "./canvas/Model3d";
import Panel from "./panel/Panel";
import Done from "./Done";
import Share from "./Share";
import Checkout from "./Checkout";
import colors from "../mocks/defaultColors";
import getContrastTheme from "../utils/getContrastTheme";

const Experience = () => {
  const [background, setBackground] = useState("#9dc8cf");
  const bag = useSelector(selectShoeList);
  const colorsList = useSelector(selectcolorsList);

  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

  const [openCheckout, setOpenCheckout] = useState(() => {});

  useEffect(() => {
    const bag = loadFromLocalStorage("zapaz-bag");
    if (bag) {
      bag.forEach((shoe) => {
        const newShoe = { ...shoe, editing: false };
        dispatch(addShoe(newShoe));
      });
    }
    const colorsList = loadFromLocalStorage("zapaz-colors");
    if (colorsList) {
      dispatch(addList(colorsList));
    } else {
      dispatch(addList(colors));
    }
    const backgroundStored = loadFromLocalStorage("zapaz-background");
    if (backgroundStored) {
      setBackground(backgroundStored);
    }
  }, [dispatch]);

  useEffect(() => {
    saveToLocalStorage("zapaz-bag", bag);
  }, [bag]);

  useEffect(() => {
    saveToLocalStorage("zapaz-colors", colorsList);
  }, [colorsList]);

  useEffect(() => {
    document.body.style.backgroundColor = background;
    document.body.className = getContrastTheme(background);
    saveToLocalStorage("zapaz-background", background);
  }, [background]);

  const [handleShare, setHandleShare] = useState(() => {});
  const [handleShoe, setHandleShoe] = useState(() => {});

  return (
    <>
      <Navbar
        currentModel={currentModel}
        background={background}
        setBackground={setBackground}
        handleDone={handleShoe}
        openCheckout={openCheckout}
      />
      <Model3d setHandleShoe={setHandleShoe} setHandleShare={setHandleShare} />
      <Panel handleDone={handleShoe} />
      <Done />
      <Share currentModel={currentModel} handleShare={handleShare} />
      <Checkout setOpen={setOpenCheckout} />
    </>
  );
};

export default Experience;
