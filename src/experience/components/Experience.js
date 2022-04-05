import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShoe, selectCurrentShoe } from "../features/modelsListSlice";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { nanoid } from "nanoid";
import Navbar from "./Navbar";
import Model3d from "./Model3d";
import Panel from "./Panel";
import Done from "./Done";

const Experience = () => {
  const [baseModel, setBaseModel] = useState({});

  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

  const onFirstRender = () => {
    const gltfLoader = new GLTFLoader();

    const loadModel = {
      name: "super shoe",
      price: 100,
      meshes: [],
    };

    const loadShoe = {
      name: "super shoe",
      size: 39,
      editing: false,
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
      dispatch(addShoe(loadShoe));
    });
  };

  useEffect(onFirstRender, [dispatch]);

  return (
    <>
      {currentModel && <Navbar baseModel={baseModel} currentModel={currentModel} />}
      {currentModel && <Model3d baseModel={baseModel} />}
      {currentModel && <Panel />}
      {currentModel && (
        <Done baseModel={baseModel} currentModel={currentModel} />
      )}
    </>
  );
};

export default Experience;
