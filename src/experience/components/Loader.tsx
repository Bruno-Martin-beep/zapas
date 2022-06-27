import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import "./loader.scss";
import { useSpring, animated } from "react-spring";
import { CSSTransition } from "react-transition-group";

const Loader = () => {
  const { progress } = useProgress();

  const [showLoader, setShowLoader] = useState(true);

  const [props, api] = useSpring(
    {
      from: { number: 0 },
      config: { mass: 1, tension: 280, friction: 60, duration: 1500 },
    },
    []
  );

  useEffect(() => {
    api.start({ number: progress });
    if (progress === 100) {
      setShowLoader(false);
    }
  }, [progress, api]);

  return (
    <CSSTransition
      in={showLoader}
      timeout={2200}
      className="loader"
      unmountOnExit={true}
    >
      <div>
        <animated.p className="loader-text">
          {props.number.to((val) => Math.floor(val))}
        </animated.p>
        <p className="loader-text">%</p>
      </div>
    </CSSTransition>
  );
};

export default Loader;
