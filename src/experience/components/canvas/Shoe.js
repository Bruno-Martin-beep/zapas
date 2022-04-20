import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const Shoe = ({
  currentModel,
  baseModel,
  handleSelectedObject,
  handleEdit,
  setRenderer,
  setScene,
}) => {
  const { gl, scene } = useThree();

  useEffect(() => {
    setRenderer(gl);
    setScene(scene);
  }, [gl, scene, setRenderer, setScene]);

  const group = useRef();

  function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0;
    if (H.length === 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      l = 0;

    l = (cmax + cmin) / 2;
    l = +(l * 100).toFixed(1);

    return l < 75;
  }

  useEffect(() => {
    if (
      group.current.children &&
      currentModel.prevMesh.index !== currentModel.currentMesh.index
    ) {
      group.current.children[currentModel.currentMesh.index].material.color.set(
        hexToHSL(currentModel.currentMesh.color) ? "#ffffff" : "#666666"
      );
    }
  }, [currentModel]);

  useFrame(() => {
    if (group.current.children) {
      group.current.children.forEach((mesh, index) =>
        mesh.material.color.lerp(
          new THREE.Color(
            currentModel.meshes[index].color
          ).convertSRGBToLinear(),
          0.075
        )
      );
    }
  });

  return (
    <group position={[0, 0.15, 0]} ref={group}>
      {currentModel.meshes.map((elem, index) => {
        return (
          <mesh
            key={elem.index}
            name={elem.name}
            geometry={baseModel.meshes[index].geometry}
            material={baseModel.meshes[index].material}
            material-color={elem.color}
            onClick={(e) => {
              e.stopPropagation();
              if (!currentModel.editing) {
                return handleEdit();
              }
              e.eventObject.material.color.set(
                hexToHSL(currentModel.currentMesh.color) ? "#ffffff" : "#666666"
              );
              return handleSelectedObject(index);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "default";
            }}
          />
        );
      })}
    </group>
  );
};

export default Shoe;
