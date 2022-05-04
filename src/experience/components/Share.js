import React from "react";
import "./share.scss";

const Share = ({ handleShare }) => {
  return (
    <div className={"controls visible share"}>
      <div className="done" onClick={() => handleShare()}>
        Share
      </div>
    </div>
  );
};

export default Share;
