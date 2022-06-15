import { useEffect, useRef } from "react";
import { Color } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import shoeModel from "../../../assets/shoe.glb";
import { useSpring, animated } from "@react-spring/three";
import getContrastTheme from "../../utils/getContrastTheme";
import { Model } from "../../features/modelsListSlice";

const Shoe = ({
  currentModel,
  addToCurrentModel,
  handleSelectedObject,
  handleEdit,
}: {
  currentModel: Model;
  addToCurrentModel: Function;
  handleSelectedObject: Function;
  handleEdit: Function;
}) => {
  const shoe = useGLTF(shoeModel) as GLTF;
  const group = useRef<THREE.Group>(null);
  const { progress } = useProgress();

  useEffect(() => {
    addToCurrentModel(shoe);
  }, [addToCurrentModel, shoe]);

  const [style, api] = useSpring(
    {
      val: 0,
      config: { mass: 1, tension: 170, friction: 140, precision: 0.0001 },
    },
    []
  );

  useEffect(() => {
    if (progress === 100) {
      api.start({
        val: 1,
        delay: 1800,
      });
    }
  }, [progress, api]);

  useEffect(() => {
    if (
      group.current?.children &&
      currentModel?.prevMesh.index !== currentModel?.currentMesh.index
    ) {
      (
        (group.current?.children[currentModel.currentMesh.index] as THREE.Mesh)
          .material as THREE.MeshStandardMaterial
      ).color.set(
        getContrastTheme(currentModel.currentMesh.color) ? "#f2f2f2" : "#1a1a1a"
      );
    }
  }, [currentModel?.currentMesh, currentModel?.prevMesh]);

  useFrame(() => {
    if (group.current?.children) {
      (group.current.children as THREE.Mesh[]).forEach((mesh, index) =>
        (mesh.material as THREE.MeshStandardMaterial).color.lerp(
          new Color(currentModel?.meshes[index].color).convertSRGBToLinear(),
          0.075
        )
      );
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>, index: number) => {
    e.stopPropagation();
    if (!currentModel.editing) {
      handleEdit();
    }
    (
      (e.eventObject as THREE.Mesh).material as THREE.MeshStandardMaterial
    ).color.set(
      getContrastTheme(currentModel.currentMesh.color) ? "#f2f2f2" : "#1a1a1a"
    );
    handleSelectedObject(index);
  };

  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    document.body.style.cursor = "default";
  };

  const scale = style.val.to([0, 1], [1.5, 1]);
  const rotationX = style.val.to([0, 1], [Math.PI / 16, 0]);
  const rotationY = style.val.to(
    [0, 1],
    [-(Math.PI / 24) * 21, -(Math.PI * 2)]
  );
  const rotationZ = style.val.to([0, 1], [-(Math.PI / 6), 0]);

  return (
    <animated.group
      scale={scale}
      position={[0, 0.15, 0]}
      rotation-x={rotationX}
      rotation-y={rotationY}
      rotation-z={rotationZ}
      ref={group}
    >
      {(shoe.scene.children as THREE.Mesh[]).map((mesh, index) => {
        return (
          <mesh
            key={index}
            name={mesh.name}
            geometry={mesh.geometry}
            material={mesh.material}
            material-color={currentModel.meshes[index].color}
            onClick={(e) => handleClick(e, index)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
        );
      })}
    </animated.group>
  );
};

export default Shoe;

useGLTF.preload(shoeModel);
