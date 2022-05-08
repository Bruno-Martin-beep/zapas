import React from 'react';
import "./shoeName.scss";
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectCurrentShoe } from '../../features/modelsListSlice';

const ShoeName = () => {
  const currentModel = useSelector(selectCurrentShoe);

  return (
    <div
        className={classNames("shoe-name", {
          visible: !currentModel?.editing,
        })}
      >
        {!currentModel ? (
          <h2>Loading ...</h2>
        ) : (
          <>
            <p className="shoe-click">Click shoe to edit</p>
            <h2>{currentModel?.name}</h2>
          </>
        )}
      </div>
  )
}

export default ShoeName