import React, { useEffect } from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";

import { saveToLocalStorage } from "../localStorage";
import {
  selectShoeList,
  addShoe,
  addToList,
  removeShoe,
} from "../features/modelsListSlice";

const Bag = ({ active, handleClick, handleDone }) => {
  const dispatch = useDispatch();
  const bag = useSelector(selectShoeList);

  useEffect(() => {
    saveToLocalStorage(bag)
  }, [bag])
  

  const handleEdit = (shoe) => {
    if(!shoe.editing) {
      dispatch(addShoe({ ...shoe, editing: !shoe.editing }));
      dispatch(addToList({ ...shoe, editing: !shoe.editing }));
      handleClick();
    } else {
      handleDone()
    }
  };

  const handleRemove = (shoe) => {
    dispatch(removeShoe(shoe));
  };

  return (
    <div className={classNames("bag", { visible: active })}>
      <div className="bag-title">
        <h3>Your bag</h3>
        <h3 className="close" onClick={() => handleClick()}>
          Close
        </h3>
      </div>
      <div className="bag-content">
        {bag.length === 0 && <p>Your bag is currently empty.</p>}
        {bag.map((shoe) => {
          return (
            <div
              key={shoe.index}
              className={classNames("bag-shoe", { editing: shoe.editing })}
            >
              <img
                className="bag-shoe-render"
                src={shoe.image}
                alt={"Shoe"}
              />
              <div className="bag-shoe-info">
                <div className="bag-shoe-info2">
                  <p>{shoe.name}</p>
                  <p>${shoe.price}</p>
                </div>
                <p>Size {shoe.size}</p>
                <div className="bag-shoe-info2">
                  <div>
                    <p
                      className="bag-shoe-control"
                      onClick={() => handleEdit(shoe)}
                    >
                      {shoe.editing ? "Save" : "Edit"}
                    </p>
                    <p>Share</p>
                  </div>
                  <p
                    className="bag-shoe-control"
                    onClick={() => handleRemove(shoe)}
                  >
                    Remove
                  </p>
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
