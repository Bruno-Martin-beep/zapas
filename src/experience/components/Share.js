import React from 'react'
import classNames from "classnames";

const Share = ({ currentModel, handleShare }) => {
  return (
    <div className={classNames("controls", { visible: currentModel.sharing }, "share")}>
      <div className="done" onClick={() => handleShare()}>
        Download
      </div>
    </div>
  )
}

export default Share