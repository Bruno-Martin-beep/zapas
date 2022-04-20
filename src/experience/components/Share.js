import React from "react";

const Share = ({ handleShare }) => {
  return (
    <div className={"controls visible share"}>
      <div className="done" onClick={() => handleShare()}>
        Screenshot
      </div>
    </div>
  );
};

export default Share;
