import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const GetInfo = ({ setCanvasInfo }) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    setCanvasInfo({ gl, scene, camera });
    console.log("render");
  }, [gl, scene, camera, setCanvasInfo]);

  return null;
};

export default GetInfo;
