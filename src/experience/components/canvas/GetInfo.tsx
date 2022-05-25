import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const GetInfo = ({ setCanvasInfo }: { setCanvasInfo: Function }) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    setCanvasInfo({ gl, scene, camera });
  }, [gl, scene, camera, setCanvasInfo]);

  return null;
};

export default GetInfo;
