import { Suspense, useCallback, useEffect, useState } from "react";
import "./model3d.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentShoe,
  updateShoe,
  changeCurrentMesh,
  changePrevMesh,
  RootModel,
} from "../../features/modelsListSlice";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import Shoe from "./Shoe";
import { nanoid } from "nanoid";
import { addShoe } from "../../features/shoeListSlice";
import GetInfo from "./GetInfo";
import { PerspectiveCamera } from "three";

interface CanvasInfo {
  gl: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
}

const Model3d = ({
  setHandleShoe,
  setHandleShare,
}: {
  setHandleShoe: Function;
  setHandleShare: Function;
}) => {
  const currentModel = useSelector(selectCurrentShoe);
  const dispatch = useDispatch();
  const [canvasInfo, setCanvasInfo] = useState<CanvasInfo>({} as CanvasInfo);

  const handleSelectedObject = (newMesh: number) => {
    dispatch(changePrevMesh(currentModel.currentMesh));
    dispatch(changeCurrentMesh(newMesh));
  };

  const handleEdit = () => {
    dispatch(
      updateShoe({
        ...currentModel,
        currentMesh: currentModel.currentMesh.index,
        editing: true,
      })
    );
  };

  useEffect(() => {
    setHandleShare(() => () => {
      const link = document.createElement("a");
      document.body.appendChild(link); //Firefox requires the link to be in the body
      link.setAttribute("download", currentModel.name);
      canvasInfo.gl.render(canvasInfo.scene, canvasInfo.camera);
      link.setAttribute(
        "href",
        canvasInfo.gl.domElement.toDataURL("image/png")
      );
      link.click();
      document.body.removeChild(link);
    });
  }, [setHandleShare, canvasInfo, currentModel?.name]);

  useEffect(() => {
    setHandleShoe(() => () => {
      const oldCamera = canvasInfo.camera.clone();
      const camera1 = new PerspectiveCamera(45, 1, 2, 5);
      camera1.position.set(0, 0.15, 2.75);

      canvasInfo.gl.setSize(400, 400);

      canvasInfo.gl.render(canvasInfo.scene, camera1);

      const image = canvasInfo.gl.domElement.toDataURL("image/webp");

      oldCamera.aspect = window.innerWidth / window.innerHeight;
      oldCamera.updateProjectionMatrix();

      canvasInfo.gl.setSize(window.innerWidth, window.innerHeight);

      canvasInfo.gl.render(canvasInfo.scene, oldCamera);

      const newShoe = {
        ...currentModel,
        editing: false,
        currentMesh: currentModel.currentMesh.index,
        index: nanoid(),
      };
      dispatch(
        addShoe({
          ...currentModel,
          currentMesh: currentModel.currentMesh.index,
          editing: false,
          image,
        })
      );
      dispatch(updateShoe(newShoe));
    });
  }, [dispatch, setHandleShoe, canvasInfo, currentModel]);

  const addToCurrentModel = useCallback(
    (shoe: GLTF) => {
      const loadModel: {
        name: string;
        meshes: { name: string; geometry: {}; material: {} }[];
      } = {
        name: "super shoe",
        meshes: [],
      };

      const loadShoe: RootModel = {
        name: "super shoe",
        price: 100,
        size: 39,
        editing: false,
        meshes: [],
        currentMesh: 0,
        prevMesh: { name: "", color: "#ffffff", index: 0 },
        index: nanoid(),
      };

      (shoe.scene.children as THREE.Mesh[]).forEach(
        (mesh: THREE.Mesh, index: number) => {
          return (
            (loadModel.meshes = [
              ...loadModel.meshes,
              {
                name: mesh.name,
                geometry: mesh.geometry,
                material: mesh.material,
              },
            ]),
            (loadShoe.meshes = [
              ...loadShoe.meshes,
              {
                name: mesh.name,
                color: "#ffffff",
                index,
              },
            ])
          );
        }
      );

      loadShoe.currentMesh = 0;
      loadShoe.prevMesh = loadShoe.meshes[0];

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
        <GetInfo setCanvasInfo={setCanvasInfo} />
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
          />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={1} maxDistance={15} />
      </Canvas>
    </div>
  );
};

export default Model3d;
