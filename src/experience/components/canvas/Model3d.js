import React, { Suspense, useCallback } from "react";
import "./model3d.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentShoe,
  updateShoe,
  changeCurrentMesh,
  changePrevMesh,
} from "../../features/modelsListSlice";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Shoe from "./Shoe";
import { nanoid } from "nanoid";

const Model3d = ({ setRenderer, setScene, setCamera }) => {
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();

  const handleSelectedObject = (newMesh) => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    dispatch(changeCurrentMesh(newMesh));
  };

  const handleEdit = () => {
    dispatch(updateShoe({ ...currentModel, editing: true }));
  };

  const addToCurrentModel = useCallback(
    (shoe) => {
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

      shoe.scene.children.forEach((elem, index) => {
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
      dispatch(updateShoe(loadShoe));
    },
    [dispatch]
  );

  return (
    <div className={classNames("canvas", { editing: currentModel?.editing })}>
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 45,
          position: [
            0,
            0,
            window.innerWidth / window.innerHeight > 1 ? 2.75 : 6,
          ],
        }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[2, 2, 2]}
          color="#ffffff"
          intensity={0.25}
        />
        <directionalLight
          position={[-2, -2, -2]}
          color="#ffffff"
          intensity={0.25}
        />
        <Suspense fallback={null}>
          <Shoe
            currentModel={currentModel}
            addToCurrentModel={addToCurrentModel}
            handleSelectedObject={handleSelectedObject}
            handleEdit={handleEdit}
            setRenderer={setRenderer}
            setScene={setScene}
            setCamera={setCamera}
          />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={1} maxDistance={15} />
      </Canvas>
    </div>
  );
};

export default Model3d;
