import "./shoeName.scss";
import { useSelector } from "react-redux";
import { selectCurrentShoe } from "../../features/modelsListSlice";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const ShoeName = () => {
  const currentModel = useSelector(selectCurrentShoe);

  return (
    <CSSTransition
      in={!currentModel?.editing}
      timeout={300}
      className="shoe-name"
      unmountOnExit={true}
      enter={true}
    >
      <div>
        <SwitchTransition>
          <CSSTransition
            key={!currentModel ? "loading" : "name"}
            timeout={300}
            unmountOnExit={true}
            enter={true}
          >
            <div>
              {!currentModel ? (
                <h2>Loading ...</h2>
              ) : (
                <>
                  <p className="shoe-click">Click shoe to edit</p>
                  <h2>{currentModel?.name}</h2>
                </>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </CSSTransition>
  );
};

export default ShoeName;
