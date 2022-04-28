import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShoe, selectCurrentShoe } from "../features/modelsListSlice";
import { addShoe } from "../features/shoeListSlice";
import { addList } from "../features/colorsListSlice";
import { loadFromLocalStorage } from "../localStorage";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { nanoid } from "nanoid";
import Navbar from "./navbar/Navbar";
import Model3d from "./canvas/Model3d";
import Panel from "./panel/Panel";
import Done from "./Done";
import Share from "./Share";
import Checkout from "./Checkout";
import colors from "../mocks/defaultColors";

import { PerspectiveCamera } from "three";

const Experience = () => {
  const [baseModel, setBaseModel] = useState({});
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);

  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

  const [openCheckout, setOpenCheckout] = useState(() => {});

  useEffect(() => {
    const bag = loadFromLocalStorage("bag");
    if (bag) {
      bag.forEach((shoe) => {
        const newShoe = { ...shoe, editing: false };
        dispatch(addShoe(newShoe));
      });
    }
    const colorsList = loadFromLocalStorage("colors");
    if (colorsList) {
      dispatch(addList(colorsList));
    } else {
      dispatch(addList(colors));
    }
  }, [dispatch]);

  const onFirstRender = () => {
    const gltfLoader = new GLTFLoader();

    const loadModel = {
      name: "super shoe",
      meshes: [],
    };

    const loadShoe = {
      name: "super shoe",
      price: 100,
      editing: false,
      size: 39,
      meshes: [],
      index: nanoid(),
    };

    gltfLoader.load("zapas/shoe.glb", (gltf) => {
      gltf.scene.children.forEach((elem, index) => {
        return (
          (loadModel.meshes = [
            ...loadModel.meshes,
            {
              name: elem.name,
              geometry: elem.geometry,
              material: elem.material,
            },
          ]),
          (loadShoe.meshes = [
            ...loadShoe.meshes,
            {
              name: elem.name,
              color: "#ffffff",
              index,
            },
          ])
        );
      });
      setBaseModel(loadModel);
      dispatch(updateShoe(loadShoe));
    });
  };

  useEffect(onFirstRender, [dispatch]);

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

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

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

  if (!currentModel) return <></>;

  return (
    <>
      <Navbar
        currentModel={currentModel}
        handleDone={handleDone}
        openCheckout={openCheckout}
      />
      <Model3d
        baseModel={baseModel}
        setRenderer={setRenderer}
        setScene={setScene}
        setCamera={setCamera}
      />
      <Panel currentModel={currentModel} />
      <Done currentModel={currentModel} handleDone={handleDone} />
      <Share currentModel={currentModel} handleShare={handleShare} />
      <Checkout setOpen={setOpenCheckout} />
    </>
  );
};

export default Experience;
