import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import shoeModel from "../../../assets/shoe.glb";
import { useSpring, animated, config } from "@react-spring/three";
import getContrastTheme from "../../utils/getContrastTheme";

const Shoe = ({
  currentModel,
  addToCurrentModel,
  handleSelectedObject,
  handleEdit,
}) => {
  const shoe = useGLTF(shoeModel);
  const group = useRef();

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
      group.current.children &&
      currentModel?.prevMesh.index !== currentModel?.currentMesh.index
    ) {
      group.current.children[currentModel.currentMesh.index].material.color.set(
        getContrastTheme(currentModel.currentMesh.color) ? "#f2f2f2" : "#1a1a1a"
      );
    }
  }, [currentModel?.currentMesh, currentModel?.prevMesh]);

  useFrame(() => {
    if (group.current.children) {
      group.current.children.forEach((mesh, index) =>
        mesh.material.color.lerp(
          new THREE.Color(
            currentModel?.meshes[index].color
          ).convertSRGBToLinear(),
          0.075
        )
      );
    }
  });

  const handleClick = (e, index) => {
    e.stopPropagation();
    if (!currentModel.editing) {
      handleEdit();
    }
    e.eventObject.material.color.set(
      getContrastTheme(currentModel.currentMesh.color) ? "#f2f2f2" : "#1a1a1a"
    );
    handleSelectedObject(index);
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "default";
  };

  return (
    <animated.group scale={style.scale} position={[0, 0.15, 0]} ref={group}>
      {shoe.scene.children.map((elem, index) => {
        return (
          <mesh
            key={index}
            name={elem.name}
            geometry={elem.geometry}
            material={elem.material}
            material-color={currentModel?.meshes[index].color}
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
