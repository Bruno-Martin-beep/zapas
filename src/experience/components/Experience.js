import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShoe, selectCurrentShoe } from "../features/modelsListSlice";
import { addShoe, selectShoeList } from "../features/shoeListSlice";
import { addList, selectcolorsList } from "../features/colorsListSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "../localStorage";
import { nanoid } from "nanoid";
import Navbar from "./navbar/Navbar";
import Model3d from "./canvas/Model3d";
import Panel from "./panel/Panel";
import Done from "./Done";
import Share from "./Share";
import Checkout from "./Checkout";
import colors from "../mocks/defaultColors";
import { PerspectiveCamera } from "three";
import getContrastTheme from "../utils/getContrastTheme";

const Experience = () => {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
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

  const handleShare = () => {
    const link = document.createElement("a");
    document.body.appendChild(link); //Firefox requires the link to be in the body
    link.setAttribute("download", currentModel.name);
    renderer.render(scene, camera);
    link.setAttribute("href", renderer.domElement.toDataURL("image/png"));
    link.click();
    document.body.removeChild(link);
  };

  const handleDone = () => {
    const oldCamera = camera.clone();
    const camera1 = new PerspectiveCamera(45, 1, 2, 5);
    camera1.position.set(0, 0.15, 2.75);

    renderer.setSize(400, 400);

    renderer.render(scene, camera1);

    const image = renderer.domElement.toDataURL("image/webp");

    oldCamera.aspect = window.innerWidth / window.innerHeight;
    oldCamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, oldCamera);

    const newShoe = {
      ...currentModel,
      editing: false,
      index: nanoid(),
    };
    dispatch(addShoe({ ...currentModel, editing: false, image }));
    dispatch(updateShoe(newShoe));
  };

  // if (!currentModel) return <></>;

  return (
    <>
      <Navbar
        currentModel={currentModel}
        background={background}
        setBackground={setBackground}
        handleDone={handleDone}
        openCheckout={openCheckout}
      />
      <Model3d
        setRenderer={setRenderer}
        setScene={setScene}
        setCamera={setCamera}
      />
      <Panel handleDone={handleDone} />
      <Done />
      <Share currentModel={currentModel} handleShare={handleShare} />
      <Checkout setOpen={setOpenCheckout} />
    </>
  );
};

export default Experience;
