import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  selectShoeList,
  addShoe,
  addToList,
  removeShoe,
} from "../features/modelsListSlice";
import ShoeBag from "./ShoeBag";

const Bag = ({ active, baseModel, handleClick }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);

  const handleEdit = (shoe) => {
    dispatch(addShoe({ ...shoe, editing: !shoe.editing }));
    dispatch(addToList());
    handleClick();
  };

  const handleRemove = (shoe) => {
    dispatch(removeShoe(shoe));
  };

  return (
    <div className={classNames("bag", { visible: active })}>
      <div className="bag-title">
        <h3>Your bag</h3>
        <h3 className="close" onClick={() => handleClick()}>Close</h3>
      </div>
      <div className="bag-content">
        {bag.length === 0 && <p>Your bag is currently empty.</p>}
        {bag.map((shoe) => {
          return (
            <div
              key={shoe.index}
              className={classNames("bag-shoe", { editing: shoe.editing })}
            >
              <ShoeBag shoe={shoe} baseModel={baseModel} />
              <div className="bag-shoe-info">
                <div className="bag-shoe-info2">
                  <p>{shoe.name}</p>
                  <p>${baseModel.price}</p>
                </div>
                <p>Size {shoe.size}</p>
                <div className="bag-shoe-info2">
                  <div >
                    <p className="bag-shoe-control" onClick={() => handleEdit(shoe)}>
                      {shoe.editing ? "Save" : "Edit"}
                    </p>
                    <p>Share</p>
                  </div>
                    <p className="bag-shoe-control" onClick={() => handleRemove(shoe)}>Remove</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="checkout">Checkout</div>
    </div>
  );
};

export default Bag;
