import { useEffect, useRef } from "react";
import { Color } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from 'three-stdlib';
import shoeModel from "../../../assets/shoe.glb";
import { useSpring, animated, config } from "@react-spring/three";
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

  useEffect(() => {
    addToCurrentModel(shoe);
  }, [addToCurrentModel, shoe]);

  const [style, api] = useSpring(
    {
      scale: 0,
      config: config.gentle,
    },
    []
  );

  useEffect(() => {
    if (group.current) {
      api.start({ scale: 1 });
    }
  }, [group, api]);

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
        (
          mesh.material as THREE.MeshStandardMaterial
        ).color.lerp(
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

  return (
    <animated.group scale={style.scale} position={[0, 0.15, 0]} ref={group}>
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
