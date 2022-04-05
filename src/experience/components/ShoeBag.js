import React from "react";
import { Canvas } from "@react-three/fiber";

const ShoeBag = ({ shoe, baseModel }) => {
  return (
    <div className="bag-shoe-render">
      <Canvas frameloop={"demand"} camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={1} />
        <group>
          {shoe.meshes.map((elem, index) => {
            return (
              <mesh
                key={index}
                name={elem.name}
                geometry={baseModel.meshes[index].geometry}
                material={baseModel.meshes[index].material}
                material-color={elem.color}
              />
            );
          })}
        </group>
      </Canvas>
    </div>
  );
};

export default ShoeBag;
