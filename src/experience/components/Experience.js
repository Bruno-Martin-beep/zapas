import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList, addShoe, selectCurrentShoe } from "../features/modelsListSlice";
import { loadFromLocalStorage } from "../localStorage";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { nanoid } from "nanoid";
import Navbar from "./Navbar";
import Model3d from "./Model3d";
import Panel from "./Panel";
import Done from "./Done";

const Experience = () => {
  const [baseModel, setBaseModel] = useState({});
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);

  const dispatch = useDispatch();
  const currentModel = useSelector(selectCurrentShoe);

  useEffect(() => {
    const bag = loadFromLocalStorage();
    bag.map(shoe => dispatch(addToList(shoe)));
  }, [dispatch])
  

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
      dispatch(addShoe(loadShoe));
    });
  };

  useEffect(onFirstRender, [dispatch]);

  return (
    <>
      {currentModel && <Navbar currentModel={currentModel} />}
      {currentModel && <Model3d baseModel={baseModel} setRenderer={setRenderer} setScene={setScene} />}
      {currentModel && <Panel />}
      {currentModel && (
        <Done currentModel={currentModel}  renderer={renderer} scene={scene} />
      )}
    </>
  );
};

export default Experience;
