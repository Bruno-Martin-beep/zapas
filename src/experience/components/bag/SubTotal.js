import React from "react";
import "./subTotal.scss";

const SubTotal = ({ bag }) => {
  return (
    <div className="subtotal-cont">
      <p>SubTotal</p>
      <p>${bag.reduce((prev, shoe) => prev + shoe.price, 0)}</p>
    </div>
  );
};

export default SubTotal;
