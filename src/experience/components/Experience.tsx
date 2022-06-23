import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addShoe,
  selectShoeList,
  StandardModel,
} from "../features/shoeListSlice";
import { addList, selectcolorsList } from "../features/colorsListSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import Loader from "./Loader";
import Navbar from "./navbar/Navbar";
import Bag from "./bag/Bag";
import Model3d from "./canvas/Model3d";
import Panel from "./panel/Panel";
import Done from "./Done";
import Share from "./Share";
import Checkout from "./Checkout";
import colors from "../mocks/defaultColors";
import getContrastTheme from "../utils/getContrastTheme";
import Dialog from "./Dialog";

const Experience = () => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);
  const colorsList = useSelector(selectcolorsList);
  const [background, setBackground] = useState<string>("#9dc8cf");

  useLayoutEffect(() => {
    const bag: StandardModel[] = loadFromLocalStorage("zapaz-bag");
    if (bag) {
      bag.forEach((shoe) => {
        const newShoe = { ...shoe, editing: false };
        dispatch(addShoe(newShoe));
      });
    }
    const colorsList: string[] = loadFromLocalStorage("zapaz-colors");
    if (colorsList) {
      dispatch(addList(colorsList));
    } else {
      dispatch(addList(colors));
    }
    const backgroundStored: string = loadFromLocalStorage("zapaz-background");
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
    document.body.className = getContrastTheme(background)
      ? "theme--dark"
      : "theme--light";
    saveToLocalStorage("zapaz-background", background);
  }, [background]);

  const [openBag, setOpenBag] = useState<Function>(() => {});
  const [openCheckout, setOpenCheckout] = useState<Function>(() => {});

  const [handleShare, setHandleShare] = useState<Function>(() => {});
  const [handleShoe, setHandleShoe] = useState<Function>(() => {});

  return (
    <>
      <Loader />
      <Dialog />
      <Navbar
        background={background}
        setBackground={setBackground}
        openBag={openBag}
      />
      <Bag
        setOpenBag={setOpenBag}
        handleShoe={handleShoe}
        openCheckout={openCheckout}
      />
      <Model3d setHandleShoe={setHandleShoe} setHandleShare={setHandleShare} />
      <Panel handleDone={handleShoe} />
      <Done />
      <Share handleShare={handleShare} />
      <Checkout setOpen={setOpenCheckout} />
    </>
  );
};

export default Experience;
