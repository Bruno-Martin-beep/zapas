import "./share.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectCurrentShoe } from "../features/modelsListSlice";

const Share = ({ handleShare }: { handleShare: Function }) => {
  const currentModel = useSelector(selectCurrentShoe);

  return (
    <div className={classNames("controls", {
      visible: currentModel,
    }, "share")}>
      <div className="done" onClick={() => handleShare()}>
        Share
      </div>
    </div>
  );
};

export default Share;
